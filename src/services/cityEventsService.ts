import { Event, EventList } from '../types/City';
import { cityList } from "../city/cityList";
import axios from 'axios';

type GetCityEventListProps = {
  cityName: string;
  categoryIdList: string;
  nextEventPageIds?: string | null;
  startDate: string;
  endDate: string;
  search: string;
}

export const getCityEventList = async ({
  cityName,
  categoryIdList,
  nextEventPageIds = null,
  startDate,
  endDate,
  search
}: GetCityEventListProps): Promise<EventList> => {
  const cityData = cityList[cityName.toLowerCase()];
  
  const categoryIdListParams = categoryIdList 
  ? { 'categories-metropolitaines[]': categoryIdList.split(',').filter(Boolean).map(Number) } 
  : {};

  console.log({
    cityName,
    categoryIdList,
    nextEventPageIds,
    startDate,
    endDate,
    search
  });
  

  const axiosRequest = await axios.get(cityData.cityEvents.url.fetchAllEvents, {
    params: {
      ...categoryIdListParams,
      search: search && search.length > 0 ? search : null,
      'timings[gte]': startDate && startDate.length > 0 ? startDate : null,
      'timings[lte]': endDate && endDate.length > 0 ? endDate : null,
      'timings[tz]': 'Europe/Paris',
      'after[]': nextEventPageIds ?? null,
      'relative[]': 'upcoming',
      'sort': 'timings.asc',
    },
  });

  return axiosRequest.data ?? [];
}

type GetCitySearchEventListProps = {
  cityName: string;
  nextEventPageIds?: string | null;
  search: string;
  // categoryIdList: string;
  // startDate: string;
  // endDate: string;
}

export const getCitySearchEventList = async ({
  cityName,
  nextEventPageIds = null,
  search
  // categoryIdList,
  // startDate,
  // endDate,
}: GetCitySearchEventListProps): Promise<Event[]> => {
  const cityData = cityList[cityName.toLowerCase()];
  
  // const categoryIdListParams = categoryIdList 
  // ? { 'categories-metropolitaines[]': categoryIdList.split(',').filter(Boolean).map(Number) } 
  // : {};
  

  const axiosRequest = await axios.get(cityData.cityEvents.url.fetchAllEvents, {
    params: {
      // ...categoryIdListParams,
      // 'timings[gte]': startDate,
      // 'timings[lte]': endDate,
      // 'timings[tz]': 'Europe/Paris',
      'after[]': nextEventPageIds ?? null,
      'sort': 'timings.asc',
      'relative[]': 'upcoming',
      search
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