import { NextFunction, Request, Response } from "express";
import { validateCategory } from "../validators/categoryValidator";
import { validateCity } from "../validators/cityValidator";
import { validateDateFormat } from "../validators/dateValidator";

export const cityEventsMiddelware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const date = new Date();
  const cityName = (req.query.cityName as string) ?? "";
  const from = (req.query.from as string) ?? "";
  const to = (req.query.to as string) ?? "";
  const category = (req.query.categoryId as string)?.trim() ?? "";
  const fromDate = from.length > 0 ? new Date(from) : date;
  const toDate =
    to.length > 0
      ? new Date(to)
      : new Date(date.setFullYear(date.getFullYear() + 1));

  const cityResult = validateCity(cityName);
  const dateResult = validateDateFormat(fromDate, toDate);
  const categoryResult = validateCategory(category);

  [cityResult, dateResult, categoryResult].some((result) => {
    if (!result.valid) {
      res.status(200).send({ message: result.error });
      return true;
    }
    return false;
  }) || next();
};
