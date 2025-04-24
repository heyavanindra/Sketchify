import express, { Request, Response } from "express";
import authRouter from "./authRoute/authRoute";

const app = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.json({
    hello: "hello world",
  });
});
app.use("/auth", authRouter);
app.listen(3001, () => {
  console.log("this server is listening on port 3000");
});
