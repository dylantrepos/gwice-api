import { Response } from "express";
import { cityList } from "../city/cityList";
import { IValidator } from "../features/cityEvents/types/validator/Validator";
import { CityEvent } from "../models/cityEventModel";

// Helper function to form time ranges
export const getTimeRange = (start: number, stop: number, step: number) =>
  Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

export const cityDoesNotExist = (city: string) => {
  return !getCityNameList().includes(city.toLowerCase());
};

export const getFormatedDate = (date: Date) =>
  `${date.getUTCDate().toString().padStart(2, "0")}/${(date.getUTCMonth() + 1)
    .toString()
    .padStart(2, "0")}`;

export const getExecutionTimeDuration = (executionTime: number) => {
  let timeMessage = "";
  if (executionTime > 60) {
    const minutes = Math.floor(executionTime / 60);
    const seconds = Math.floor(executionTime % 60);
    timeMessage = `${minutes} minutes and ${seconds} seconds`;
  } else {
    timeMessage = `${executionTime.toFixed(2)} seconds`;
  }

  return timeMessage;
};

/*
 * City name
 */
export const getCityNameList = (): string[] => {
  return Object.keys(cityList) ?? [];
};

export const checkCityNameExists = (cityName: string): boolean => {
  return getCityNameList().includes(cityName.toLowerCase()) ?? false;
};

export const checkCityEventIdExists = async (
  eventId: number
): Promise<boolean> => {
  try {
    const exist = await CityEvent.findOne({
      where: { id: eventId },
    });
    return exist ? true : false;
  } catch (error) {
    return false;
  }
};

export const checkMiddlewareError = (checkItems: IValidator[], res: Response) =>
  checkItems.some((result: IValidator) => {
    if (!result.valid) {
      res.status(400).send({ message: result.error });
      return true;
    }
    return false;
  });
