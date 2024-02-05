import { Event } from '../types/City';
import { cityList } from "../city/cityList";
import axios from 'axios';

type GetCityEventsProps = {
  cityName: string;
  categoryIdList: string;
}

export const getCityEventList = async ({
  cityName,
  categoryIdList
}: GetCityEventsProps): Promise<Event[]> => {
  const cityData = cityList[cityName.toLowerCase()];

  const categoryIdListParams = categoryIdList 
  ? { 'categories-metropolitaines[]': categoryIdList.split(',').filter(Boolean).map(Number) } 
  : {};

  const axiosRequest = await axios.get(cityData.cityEvents.url.fetchAllEvents, {
    params: {
      ...categoryIdListParams,
    },
  });

  return axiosRequest.data ?? [];
}


type GetCityEventDetailsProps = {
  cityName: string;
  eventId: string;
}

export const getCityEventDetails = async ({
  cityName,
  eventId
}: GetCityEventDetailsProps): Promise<Event[]> => {
  const cityData = cityList[cityName.toLowerCase()];

  const axiosRequest = await axios.get(cityData.cityEvents.url.fetchEventDetails, {
    params: {
      uid: eventId,
    },
  });

  return axiosRequest.data ?? [];
}