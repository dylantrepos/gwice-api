import { Request, Response } from "express";
import { getOpenMeteoData } from "../services/openMeteo";
import { citiesList } from "../utils/citiesList";
import { cityDoesNotExist } from "../utils/utils";

export const weatherController = async (req: Request, res: Response) => {
  const cityQuery = req.query.city as string;

  if (!cityQuery) {
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
  const laps = req.query.laps as string ?? '2';
  const range = req.query.range as string ?? '24';

  console.log({laps, range});

  const weatherData = await getOpenMeteoData(city, laps, range);

  console.log('weatherData: ', weatherData);

  if (weatherData) {
    const { current: currentData, hourly: hourlyData } = weatherData;
    const current = {
      hour: currentData.toString().padStart(2, '0') + ':00',
      temperature: `${currentData.temperature2m}°C`,
      windSpeed: `${currentData.wind_speed_10m}km/h`,
      humidity: `${currentData.relativeHumidity2m}%`,
      isDay: currentData.isDay,
      precipitation: `${currentData.precipitation}mm`,
      weatherCode: currentData.weatherCode,
      weatherText: currentData.weatherText,
    }
  
    const hourly = hourlyData.map((data) => {
      const { time, temperature2m, weatherCode, weatherText, isDay } = data;
      const date = (new Date(time));
      const hour = date.getUTCHours();
  
      return {
        hour: hour.toString().padStart(2, '0') + ':00',
        temperature: `${temperature2m}°C`,
        weatherCode,
        weatherText,
        isDay,
      }
    })

    res.send({
      current,
      hourly, 
    });
  }
}