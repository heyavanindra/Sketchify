import { NextFunction, Request, Response } from "express";
import Jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "../authRoute/authRoute";

export function middleware(req: Request, res: Response, next: NextFunction) {
  const token = req.headers["authorization"] ?? "";
  const decoded = Jwt.verify(token, JWT_SECRET);
  if (decoded) {
    req.userId = (decoded as JwtPayload).userId;
    next();
  } else {
    res.status(403).json({
      message: "Unauthorized",
    });
  }
}
