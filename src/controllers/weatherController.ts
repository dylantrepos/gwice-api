import { Request, Response } from "express";

export const weatherController = (req: Request, res: Response) => {
  const city = req.params.city.toLowerCase();

  res.send({ 
    type: 'Weather',
    city,
  })
}