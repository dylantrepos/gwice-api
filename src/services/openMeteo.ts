import { fetchWeatherApi } from 'openmeteo';
import { weatherCodes } from '../utils/openMeteoWeatherCodes';
import { citiesList } from '../utils/citiesList';
import axios from 'axios';

type GetCityCoordinates = {
  longitude: string;
  latitude: string;
}

const getCityCoordinates = async (city: string): Promise<GetCityCoordinates | undefined> => {
  
  try {
      if (!citiesList.includes(city)) throw new Error('City not found');
      const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city},FR&limit=5&appid=${process.env.OPEN_WEATHER_API_KEY}`;
      const response = await axios.get(url);
      const data = response.data;
      const {lon, lat} = data[0];
      return { longitude: lon, latitude: lat };
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

type GetOpenWeatherData = {
  time: string;
  temperature2m: number;
  weatherCode: string;
}
	
export const getOpenWeatherData = async (city: string): Promise<GetOpenWeatherData[] | undefined> => {
  const weatherHourly = [];

  const coordinates = await getCityCoordinates(city);

  if (coordinates) {
      console.log('getOpenWeatherData');
      const params = {
        "latitude": coordinates?.latitude,
        "longitude": coordinates?.longitude,
        "hourly": ["temperature_2m", "weather_code"],
        "forecast_hours": 11,
        "timezone": "Europe/Berlin",
      };
      
      const url = "https://api.open-meteo.com/v1/forecast";
      const responses = await fetchWeatherApi(url, params);
      
      // Helper function to form time ranges
      const range = (start: number, stop: number, step: number) =>
        Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);
      
      // Process first location. Add a for-loop for multiple locations or weather models
      const response = responses[0];
      
      // Attributes for timezone and location
      const utcOffsetSeconds = response.utcOffsetSeconds();
      // const timezone = response.timezone();
      // const timezoneAbbreviation = response.timezoneAbbreviation();
      // const latitude = response.latitude();
      // const longitude = response.longitude();
      
      const hourly = response.hourly()!;
      
      // Note: The order of weather variables in the URL query and the indices below need to match!
      const weatherData = {
      
        hourly: {
          time: range(Number(hourly.time()), Number(hourly.timeEnd()), hourly.interval()).map(
            (t) => new Date((t + utcOffsetSeconds) * 1000)
          ),
          temperature2m: hourly.variables(0)!.valuesArray()!,
          weatherCode: hourly.variables(1)!.valuesArray()!
        },
      
      };
    
      // `weatherData` now contains a simple structure with arrays for datetime and weather data
      for (let i = 0; i < weatherData.hourly.time.length; i++) {
        if (i % 2 === 0 && i !== 0) {
          weatherHourly.push({
            time: weatherData.hourly.time[i].toISOString(),
            temperature2m: Math.round(weatherData.hourly.temperature2m[i]),
            weatherCode: weatherCodes[+weatherData.hourly.weatherCode[i]], 
          });
        }
      }
    }

  return weatherHourly;
}
