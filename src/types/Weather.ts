export type CityCoordinates = {
  longitude: string;
  latitude: string;
}

export type OpenMeteoDataCurrent = {
  date: string;
  temperature: string;
  relativeHumidity: string;
  windSpeed: string;
  apparentTemperature: string;
  isDay: number;
  precipitation: string;
  weatherCode: string;
  weatherText: string;
};

export type OpenMeteoDataDaily = {
  time: string;
  date: string;
  weatherCode: string;
  temperatureMin: string;
  temperatureMax: string;
  precipitation: string;
  rain: string;
  windSpeed: string;
};

export type OpenMeteoDataHourly = {
  time: string;
  date: string;
  hour: string;
  temperature: string;
  isDay: number;
  weatherCode: string;
  weatherText: string;
};

export type OpenMeteoData = {
  current: OpenMeteoDataCurrent;
  forecast: {
    [date: string]: {
      weather: OpenMeteoDataDaily;
      hourly: OpenMeteoDataHourly[];
    };
  }
}