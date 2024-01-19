import { fetchWeatherApi } from 'openmeteo';
import { weatherCodes } from '../utils/openMeteoWeatherCodes';
import { citiesList } from '../utils/citiesList';
import axios from 'axios';
import { CityCoordinates, GetOpenMeteoData } from '../types/Weather';
import { range } from '../utils/utils';

const getCityCoordinates = async (city: string): Promise<CityCoordinates | undefined> => {
  try {
      if (!citiesList.includes(city)) throw new Error('City not found');
      const url = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=10&language=fr&format=json`
      const response = await axios.get(url);
      const {results} = response.data;
      const {longitude, latitude} = results[0];

      return { longitude, latitude };
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

const defaultWeather = {
  current: {
    time: '',
    temperature2m: 0,
    relativeHumidity2m: 0,
    wind_speed_10m: 0,
    apparentTemperature: 0,
    isDay: 0,
    precipitation: 0,
    weatherText: '',
    weatherCode: 0,
  },
  hourly: [],
}
	
export const getOpenMeteoData = async (city: string): Promise<GetOpenMeteoData | undefined> => {
  const weather: GetOpenMeteoData = defaultWeather;

  const coordinates = await getCityCoordinates(city);

  if (coordinates) {
      const params = {
        "latitude": coordinates?.latitude,
        "longitude": coordinates?.longitude,
        "hourly": ["temperature_2m", "weather_code", "is_day"],
        "current": ["temperature_2m", "relative_humidity_2m", "apparent_temperature", "is_day", "precipitation", "weather_code", "wind_speed_10m"],
        "forecast_hours": 11,
        "forecast_days": 1,
        "timezone": "Europe/Berlin",
      };
      
      const url = "https://api.open-meteo.com/v1/forecast";
      const responses = await fetchWeatherApi(url, params);
      
      const response = responses[0];
      
      const utcOffsetSeconds = response.utcOffsetSeconds();
      const hourly = response.hourly()!;
      const current = response.current()!;

      const weatherData = {
        current: {
          time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
          temperature2m: current.variables(0)!.value(),
          windSpeed10m: current.variables(6)!.value(),
          relativeHumidity2m: current.variables(1)!.value(),
          apparentTemperature: current.variables(2)!.value(),
          isDay: current.variables(3)!.value(),
          precipitation: current.variables(4)!.value(),
          weatherCode: current.variables(5)!.value(),
        },
        hourly: {
          time: range(Number(hourly.time()), Number(hourly.timeEnd()), hourly.interval()).map(
            (t) => new Date((t + utcOffsetSeconds) * 1000)
          ),
          temperature2m: hourly.variables(0)!.valuesArray()!,
          weatherCode: hourly.variables(1)!.valuesArray()!,
          isDay: hourly.variables(2)!.valuesArray()!,
        },
      };

      weather.current = {
        time: weatherData.current.time.toISOString(),
        temperature2m: Math.round(weatherData.current.temperature2m),
        wind_speed_10m: Math.round(weatherData.current.windSpeed10m),
        relativeHumidity2m: Math.round(weatherData.current.relativeHumidity2m),
        apparentTemperature: Math.round(weatherData.current.apparentTemperature),
        isDay: Math.round(weatherData.current.isDay),
        precipitation: Math.round(weatherData.current.precipitation),
        weatherCode: +weatherData.current.weatherCode,
        weatherText: weatherCodes[+weatherData.current.weatherCode],
      }
    
      for (let i = 0; i < weatherData.hourly.time.length; i++) {
        if (i % 2 === 0 && i !== 0) {
          weather.hourly.push({
            time: weatherData.hourly.time[i].toISOString(),
            temperature2m: Math.round(weatherData.hourly.temperature2m[i]),
            weatherCode: +weatherData.hourly.weatherCode[i], 
            weatherText: weatherCodes[+weatherData.hourly.weatherCode[i]], 
            isDay: weatherData.hourly.isDay[i],
          });
        }
      }
    }

  return weather;
}
