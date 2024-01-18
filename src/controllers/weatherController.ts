import { Request, Response } from "express";
import { getOpenWeatherData } from "../services/openMeteo";

export const weatherController = async (req: Request, res: Response) => {
  const city = req.params.city.toLowerCase();

  const weatherData = await getOpenWeatherData(city);

  console.log('weatherData', weatherData);

  const weather = weatherData?.map((data) => {
    const { time, temperature2m, weatherCode } = data;
    const date = new Date(time);
    const hour = date.getUTCHours();

    return {
      hour: hour.toString().padStart(2, '0') + ':00',
      temperature: `${temperature2m}°C`,
      sky: weatherCode,
    }
  })

  res.send(weather);
}