import { NextFunction, Request, Response } from "express";
import { validateCategory } from "../validators/categoryValidator";
import { validateCity } from "../validators/cityValidator";
import { validateDateFormat } from "../validators/dateValidator";
import { validateNextPage } from "../validators/NextPageValidator";

export const cityEventsMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const date = new Date();
  const cityName = req.query.cityName as string;
  const from = req.query.from as string;
  const to = req.query.to as string;
  const category = (req.query.categoryId as string)?.trim();
  const fromDate = from?.length > 0 ? new Date(from) : date;
  const toDate =
    to?.length > 0
      ? new Date(to)
      : new Date(date.setFullYear(date.getFullYear() + 1));
  const page = (req.query.nextPage as string) ?? null;

  try {
    validateCity(cityName);
    validateDateFormat(fromDate, toDate);
    if (category && category.length > 0) {
      validateCategory(category);
    }
    if (page) {
      validateNextPage(page);
    }

    next();
  } catch (err) {
    const { message } = err as Error;
    res.status(400).send({ error: message });
    return;
  }
};
