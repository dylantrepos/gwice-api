import { NextFunction, Request, Response } from "express";
import { checkMiddlewareError } from "../../../utils/utils";
import { validateCity } from "../validators/cityValidator";
import { validateEventId } from "../validators/eventIdValidator";

export const cityEventDetailsMiddelware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const cityName = req.query.cityName as string;
  const eventId = req.query.eventId as string;

  const cityResult = validateCity(cityName);
  const eventResult = await validateEventId(eventId);

  checkMiddlewareError([cityResult, eventResult], res) || next();
};
