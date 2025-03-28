import express, { Request, Response } from "express";

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.json({
    hello: "hello world",
  });
});

app.listen(3000, () => {
  console.log("this server is listening on port 3000");
});
