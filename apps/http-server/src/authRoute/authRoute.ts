import { Request, Response, Router } from "express";
import { JWT_SECRET } from "@repo/backend-common/config";
import jwt from "jsonwebtoken";
import { CreateUserSchema } from "@repo/common/types";
import { prismaClient } from "@repo/db/client";
import { PrismaClientRustPanicError } from "../../../../packages/db/src/generated/prisma/runtime/library";

const authRouter: Router = Router();

authRouter.post("/signup", async (req: Request, res: Response) => {
  const { name, username, password } = req.body;
  const data = CreateUserSchema.safeParse({
    name,
    username,
    password,
  });
  if (!data.success) {
    res.json({
      message: data.error.message || "invalid inputs",
    }).status(503);

    return;
  }
  try {
    const createdUser = await prismaClient.users.create({
      data: {
        name: data.data.name,
        email: data.data.username,
        password: data.data.password,
      },
    });
    res.json({
      user: createdUser,
    }).status(201);
  } catch (error) {
    console.log(error);
    res.json({
      message: "something went wrong in db",
    }).status(401);
  }
});

authRouter.post("/signin", async (res: Response, req: Request) => {
  const { username, password } = req.body;

  console.log(`username is ${username} and password is ${password}`);

  const user = await prismaClient.users.findMany({
    where: {
      email: username,
    },
  });
  const filteredUser = user.filter((user) => user.password === password);
  if (filteredUser) {
    res.json({
      message: "password is incorrect",
    });
    return;
  }

  const token = jwt.sign({ username }, JWT_SECRET);

  res.json({
    token: token,
  });
});

export default authRouter;
