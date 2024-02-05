import { Event } from '../types/City';
import { cityList } from "../city/cityList";
import axios from 'axios';

type GetCityEventsProps = {
  cityName: string;
  categoryIdList: string;
}

export const getCityEvents = async ({
  cityName,
  categoryIdList
}: GetCityEventsProps): Promise<Event[]> => {
  const cityData = cityList[cityName];
  console.log('cityData', cityData.name);
  console.log('categoryIdList', categoryIdList);

  const categoryIdListParams = categoryIdList?.length > 0 
  ? { 'categories-metropolitaines[]': categoryIdList.split(',').map(Number) } 
  : {};

  const axiosRequest = await axios.get(cityData.cityEvents.fetchBaseUrlAllEvents, {
    params: {
      ...categoryIdListParams,
    },
  });

  // const { fetchBaseUrl, shortDetailsParams } = cityData.cityEvents;
  // const categoryId = getCategoryId(category);
  // const events = await getEventsFromOpenAgenda(fetchBaseUrl, shortDetailsParams, when, categoryId);
  return axiosRequest.data.events ?? [];
}