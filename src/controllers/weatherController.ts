import { Request, Response } from "express";
import { citiesList } from "../utils/citiesList";
import { cityDoesNotExist } from "../utils/utils";
import { getOpenMeteoData } from "../services/openMeteo";

export const weatherController = async (req: Request, res: Response) => {
  const cityQuery = req.query.city;

  if (!cityQuery || typeof cityQuery !== 'string') {
    res.status(400).send({ error: 'City is required.' });
    return;
  }

  if (cityDoesNotExist(cityQuery)) {
    res.status(400).send({
      error: `${cityQuery} is not a valid city or is not available for now. Check the list of the available cities.`,
      citiesAvailable: citiesList,
    });
    return;
  }

  const city = cityQuery.toLowerCase() as string;
  // const laps = req.query.laps as string ?? '2';
  // const range = req.query.range as string ?? '24';

  const weatherData = await getOpenMeteoData(city);

  res.send(weatherData);
}