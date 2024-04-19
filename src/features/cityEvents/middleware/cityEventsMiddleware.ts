import { NextFunction, Request, Response } from "express";
import { checkMiddlewareError } from "../../../utils/utils";
import { validateCategory } from "../validators/categoryValidator";
import { validateCity } from "../validators/cityValidator";
import { validateDateFormat } from "../validators/dateValidator";

export const cityEventsMiddleware = (
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

  checkMiddlewareError([cityResult, dateResult, categoryResult], res) || next();
};
