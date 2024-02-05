import { fetchWeatherApi } from 'openmeteo';
import { weatherCodes } from '../utils/openMeteoWeatherCodes';
import axios from 'axios';
import { CityCoordinates, OpenMeteoData } from '../types/Weather';
import { checkCityNameExists, getFormatedDate, getTimeRange } from '../utils/utils';

const OpenMeteoParams = {
  "hourly": ["temperature_2m", "weather_code", "is_day"],
  "current": ["temperature_2m", "relative_humidity_2m", "apparent_temperature", "is_day", "precipitation", "weather_code", "wind_speed_10m"],
  "forecast_days": 8,
  "daily": ["weather_code", "temperature_2m_max", "temperature_2m_min", "precipitation_sum", "rain_sum", "wind_speed_10m_max"],
  "timezone": "auto"
}

const DefaultCurrent = {
  date: '',
  temperature: '',
  relativeHumidity: '',
  windSpeed: '',
  apparentTemperature: '',
  isDay: 0,
  precipitation: '',
  weatherCode: '',
  weatherText: '',
};

const getCityCoordinates = async (city: string): Promise<CityCoordinates | undefined> => {
  try {
      if (!checkCityNameExists(city)) throw new Error('City not found');
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

export const getOpenMeteoData = async (
  city: string
): Promise<OpenMeteoData | undefined> => {
  const weather: OpenMeteoData = {
    current:  DefaultCurrent,
    forecast: {}
  };

  const coordinates = await getCityCoordinates(city);

  if (coordinates) {
    const params = {
      "latitude": coordinates?.latitude,
      "longitude": coordinates?.longitude,
      ...OpenMeteoParams
    };
    
    const url = "https://api.open-meteo.com/v1/forecast";
    const [cityResponse] = await fetchWeatherApi(url, params);
    
    const utcOffsetSeconds = cityResponse.utcOffsetSeconds();
    const hourly = cityResponse.hourly();
    const current = cityResponse.current();
    const daily = cityResponse.daily();
    
    if (!hourly || !current || !daily) return undefined;

    const timezone = cityResponse.timezone();
    
    const currentDate = new Date().toLocaleDateString('fr-FR', { timeZone: timezone! });

    const weatherDailyData = {
      time: getTimeRange(Number(daily.time()), Number(daily.timeEnd()), daily.interval()).map(
        (t) => new Date((t + utcOffsetSeconds) * 1000)
      ),
      weatherCode: daily.variables(0)!.valuesArray()!,
      temperature2mMax: daily.variables(1)!.valuesArray()!,
      temperature2mMin: daily.variables(2)!.valuesArray()!,
      precipitationSum: daily.variables(3)!.valuesArray()!,
      rainSum: daily.variables(4)!.valuesArray()!,
      windSpeedMax: daily.variables(5)!.valuesArray()!,
    };

    const weatherHourlyData = {
      time: getTimeRange(Number(hourly.time()), Number(hourly.timeEnd()), hourly.interval()).map(
        (t) => new Date((t + utcOffsetSeconds) * 1000)
      ),
      temperature2m: hourly.variables(0)!.valuesArray()!,
      weatherCode: hourly.variables(1)!.valuesArray()!,
      isDay: hourly.variables(2)!.valuesArray()!,
    };

    weatherDailyData.time.forEach((time, i) => {
      const date = new Date(time);
      const formattedDate = getFormatedDate(date);

      weather.forecast[formattedDate] = {
        weather: {
          time: date.toISOString(),
          date: formattedDate,
          weatherCode: weatherDailyData.weatherCode[i].toString(),
          temperatureMin: `${Math.round(weatherDailyData.temperature2mMin[i])} °C`,
          temperatureMax: `${Math.round(weatherDailyData.temperature2mMax[i])} °C`,
          precipitation: `${Math.round(weatherDailyData.precipitationSum[i])} mm`,
          windSpeed: `${Math.round(weatherDailyData.windSpeedMax[i])} km/h`,
          rain: Math.round(weatherDailyData.rainSum[i]).toString(),
        },
        hourly: [],
      };
    });

    weather.current = {
      date: currentDate,
      temperature: `${Math.round(current.variables(0)!.value())} °C`,
      windSpeed: `${Math.round(current.variables(6)!.value())} km/h`,
      relativeHumidity: `${Math.round(current.variables(1)!.value())} %`,
      apparentTemperature: `${Math.round(current.variables(2)!.value())} °C`,
      isDay: Math.round(current.variables(3)!.value()),
      precipitation: `${Math.round(current.variables(4)!.value())} mm`,
      weatherCode: current.variables(5)!.value().toString(),
      weatherText: weatherCodes[+current.variables(5)!.value()],
    }

    for (let i = 0; i < weatherHourlyData.time.length; i++) {
      const date = new Date(weatherHourlyData.time[i]);
      const formattedDate = getFormatedDate(date);

      if (weather.forecast[formattedDate]) {
        weather.forecast[formattedDate].hourly.push({
          time: weatherHourlyData.time[i].toISOString(),
          date: formattedDate,
          hour: weatherHourlyData.time[i].toISOString().slice(11, 16),
          temperature: `${Math.round(weatherHourlyData.temperature2m[i])}°C`,
          weatherCode: weatherHourlyData.weatherCode[i].toString(), 
          weatherText: weatherCodes[+weatherHourlyData.weatherCode[i]], 
          isDay: weatherHourlyData.isDay[i],
        });
      }
    }

    return weather;
  }

  return undefined;
}

