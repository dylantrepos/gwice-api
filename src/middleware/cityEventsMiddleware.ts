import { NextFunction, Request, Response } from "express";
import { validateCategory } from "../validator/cityEvents/categoryValidator";
import { validateCity } from "../validator/cityEvents/cityValidator";
import { validateDateFormat } from "../validator/cityEvents/dateValidator";

export const cityEventsMiddelware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const cityName = (req.query.cityName as string) ?? "";
  const from = (req.query.from as string) ?? "";
  const to = (req.query.to as string) ?? "";
  const category = (req.query.categoryId as string)?.trim() ?? "";
  const fromDate = new Date(from);
  const toDate = new Date(to);

  const cityResult = validateCity(cityName);
  const dateResult = validateDateFormat(fromDate, toDate);
  const categoryResult = validateCategory(category);

  [cityResult, dateResult, categoryResult].some((result) => {
    if (!result.valid) {
      res.status(400).send({ error: result.error });
      return true;
    }
    return false;
  }) || next();
};
