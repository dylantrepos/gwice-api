export type CityCoordinates = {
  longitude: string;
  latitude: string;
}

export type OpenMeteoDataCurrent = {
  time: string;
  temperature2m: number;
  relativeHumidity2m: number;
  wind_speed_10m: number;
  apparentTemperature: number;
  isDay: number;
  precipitation: number;
  weatherCode: number;
  weatherText: string;
};

export type OpenMeteoDataHourly = {
  time: string;
  temperature2m: number;
  isDay: number;
  weatherCode: number;
  weatherText: string;
};

export type GetOpenMeteoData = {
  current: OpenMeteoDataCurrent;
  hourly: OpenMeteoDataHourly[]
}