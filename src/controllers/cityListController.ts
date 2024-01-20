import { Request, Response } from "express";
import { citiesList } from "../utils/citiesList";

export const cityListController = async (_: Request, res: Response) => {
  res.send({
    cityList: citiesList, 
  });
}