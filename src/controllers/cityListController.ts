import { Request, Response } from "express";
import { cityList } from "../city/cityList";

export const cityListController = async (_: Request, res: Response) => {
  res.send({
    cityList: Object.values(cityList).map(city => city.name), 
  });
}