import { Request, Response } from "express";

export const checkController = (_: Request, res: Response) => {
  res.send({ 
    message: 'Hello from the back!'
  })
}