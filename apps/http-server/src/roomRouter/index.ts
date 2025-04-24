import express, { Request, Response } from "express";
import { middleware } from "../middleware/middleware";

const roomRouter = express.Router();


roomRouter.post('/room', middleware, (req:Request, res:Response)=>{

})