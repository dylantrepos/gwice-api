import { NextFunction, Request, Response } from "express";
import { validateCity } from "../validators/cityValidator";
import { validateEventId } from "../validators/eventIdValidator";

export const cityEventDetailsMiddelware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const cityName = req.query.cityName as string;
  const eventId = req.query.eventId as string;

  try {
    validateCity(cityName);
    await validateEventId(eventId);

    next();
  } catch (err) {
    const { message } = err as Error;
    res.status(400).send({ error: message });
    return;
  }
};
