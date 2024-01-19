import { Request, Response } from "express";
import { getOpenMeteoData } from "../services/openMeteo";

export const weatherController = async (req: Request, res: Response) => {
  const city = req.params.city.toLowerCase();

  const weatherData = await getOpenMeteoData(city);

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
      const hour = (new Date(time)).getUTCHours();
  
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