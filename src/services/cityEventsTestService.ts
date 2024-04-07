// import { CityEvent } from "../../models/cityEventModel";

type GetCityEventTestListProps = {
  // cityName: string;
  // categoryIdList: string;
  // nextEventPageIds?: string | null;
  // startDate: string;
  // endDate: string;
  // search: string;
};

export const getCityEventTestList = async ({}: // cityName,
// categoryIdList,
// nextEventPageIds = null,
// startDate,
// endDate,
// search,
GetCityEventTestListProps): Promise<void> => {
  // console.log("getCityEventTestList : ", CityEvent);
  // const firstEvent = CityEvent.find
  // const cityData = cityList[cityName.toLowerCase()];
  // const categoryIdListParams = categoryIdList
  //   ? {
  //       "categories-metropolitaines[]": categoryIdList
  //         .split(",")
  //         .filter(Boolean)
  //         .map(Number),
  //     }
  //   : {};
  // console.log({
  //   cityName,
  //   categoryIdList,
  //   nextEventPageIds,
  //   startDate,
  //   endDate,
  //   search,
  // // });
  // const axiosRequest = await axios.get(cityData.cityEvents.url.fetchAllEvents, {
  //   params: {
  //     ...categoryIdListParams,
  //     search: search && search.length > 0 ? search : null,
  //     "timings[gte]": startDate && startDate.length > 0 ? startDate : null,
  //     "timings[lte]": endDate && endDate.length > 0 ? endDate : null,
  //     "timings[tz]": "Europe/Paris",
  //     "after[]": nextEventPageIds ?? null,
  //     "relative[]": "upcoming",
  //     sort: "timings.asc",
  //   },
  // });
  // console.log(
  //   "cityData.cityEvents.url.fetchAllEvents : ",
  //   cityData.cityEvents.url.fetchAllEvents
  // );
  // console.log("after id : ", nextEventPageIds ?? null);
  // console.log("after : ", axiosRequest.request.res.responseUrl ?? null);
  // return axiosRequest.data ?? [];
};
