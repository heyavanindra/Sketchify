import { Request, Response, Router } from "express";
import { JWT_SECRET } from "@repo/backend-common/config";
import jwt from "jsonwebtoken";
import { CreateUserSchema } from "@repo/common/types";

type dbschema = {
  name: string;
  username: string;
  password: string;
};
const authRouter: Router = Router();
var arr: dbschema[] = [];

authRouter.post("/signup", (req: Request, res: Response) => {
  const { name, username, password } = req.body;
  const data = CreateUserSchema.safeParse({
    name,
    username,
    password,
  });
  if (!data.success) {
    res.json({
      message: data.error.message || "invalid inputs",
    });

    return;
  }

  arr.push(data.data);
  console.log(arr);
  res.json({
    message: arr,
  });
});

authRouter.post("/signin", (res: Response, req: Request) => {
  const { username, password } = req.body;
  console.log(`username is ${username} and password is ${password}`)
  const token = jwt.sign({ username }, JWT_SECRET);
  

  res.json({
    token: token,
  });
});

export default authRouter;
