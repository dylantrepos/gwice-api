import { Event } from '../types/City';
import { cityList } from "../city/cityList";
import axios from 'axios';

type GetCityEventsProps = {
  cityName: string;
  categoryIdList: string;
  nextEventPageIds?: string | null;
}

export const getCityEventList = async ({
  cityName,
  categoryIdList,
  nextEventPageIds = null
}: GetCityEventsProps): Promise<Event[]> => {
  const cityData = cityList[cityName.toLowerCase()];

  console.log('nextEventPageIds', nextEventPageIds);
  
  const categoryIdListParams = categoryIdList 
  ? { 'categories-metropolitaines[]': categoryIdList.split(',').filter(Boolean).map(Number) } 
  : {};
  

  const axiosRequest = await axios.get(cityData.cityEvents.url.fetchAllEvents, {
    params: {
      ...categoryIdListParams,
      'after[]': nextEventPageIds ?? null,
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