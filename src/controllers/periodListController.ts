import { Request, Response } from "express";
import { PERIODS } from "../types/Date";

export const periodListController = async (_: Request, res: Response) => {
  res.send({
    periods: Object.keys(PERIODS).map(period => period.toLowerCase()),
  });
}