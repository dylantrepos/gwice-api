import { Request, Response } from "express";

export const homeController = (_: Request, res: Response) => {
  res.send({
    status: 1,
    message: "Welcome to the Gwice API ! 🚀",
  });
};
