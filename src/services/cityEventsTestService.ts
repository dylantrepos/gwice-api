// import { CityEvent } from "../../models/cityEventModel";

import { Op } from "sequelize";
import sequelize from "../database/getConnexion";
import {
  CityEvent,
  CityEventCategory,
  CityEventLocation,
  CityEventOpenAgendaInfo,
  CityEventRegistration,
  CityEventState,
  CityEventStatus,
  CityEventTiming,
} from "../models/cityEventModel/index";
import { CityEventListReturn, CityEventReturn } from "../types/CityEvents";

type GetCityEventTestListProps = {
  cityName: string;
  eventId: string;
  // categoryIdList: string;
  // nextEventPageIds?: string | null;
  // startDate: string;
  // endDate: string;
  // search: string;
};

export const getCityEventTestList = async ({
  cityName,
  eventId,
}: // categoryIdList,
// nextEventPageIds = null,
// startDate,
// endDate,
// search
GetCityEventTestListProps): Promise<CityEventReturn> => {
  const testSeq = sequelize;
  const cityEvent = await CityEvent.findOne({
    where: { id: eventId },
    include: [
      { model: CityEventCategory },
      { model: CityEventTiming },
      { model: CityEventStatus },
      { model: CityEventState },
      { model: CityEventLocation },
      { model: CityEventRegistration },
      { model: CityEventOpenAgendaInfo },
    ],
  });

  console.log("getCityEventTestList cityName : ", cityName);
  console.log("getCityEventTestList eventId : ", eventId);
  console.log("getCityEventTestList event : ", cityEvent);
  console.log("getCityEventTestList event : ", cityEvent);
  console.log(
    "getCityEventTestList event timing : ",
    cityEvent?.city_event_timing[0]
  );

  if (!cityEvent) {
    throw new Error("City event not found");
  }

  const eventFound: CityEventReturn = {
    id: cityEvent.id,
    title: cityEvent.title,
    short_description: cityEvent.short_description,
    long_description: cityEvent.long_description,
    price: cityEvent.price,
    image_url: cityEvent.image_url,
    minimum_age: cityEvent.minimum_age,
    status: cityEvent.cityEventStatus.status_code,
    state: cityEvent.cityEventState.state_code,
    nextTiming: cityEvent.next_timing_start_date,
    location: {
      adress: cityEvent.cityEventLocation.adress,
      city: cityEvent.cityEventLocation.city,
      postal_code: cityEvent.cityEventLocation.postal_code,
    },
    registration: {
      link: cityEvent.cityEventRegistration.link,
      email: cityEvent.cityEventRegistration.email,
      phone: cityEvent.cityEventRegistration.phone,
    },
    timings: cityEvent.city_event_timing.map((timing) => ({
      begin: timing.start_time,
      end: timing.end_time,
    })),
    openAgenda: {
      uid: cityEvent.cityEventOpenAgendaInfo.event_uid,
      creator_uid: cityEvent.cityEventOpenAgendaInfo.creator_uid,
      open_agenda_created_at:
        cityEvent.cityEventOpenAgendaInfo.open_agenda_created_at,
      open_agenda_updated_at:
        cityEvent.cityEventOpenAgendaInfo.open_agenda_updated_at,
    },
    category: cityEvent.city_event_category.map((category) => category.id),
    createdAt: cityEvent.createdAt,
    updatedAt: cityEvent.updatedAt,
  };

  return eventFound;

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

type GetCityEventTestListAllProps = {
  cityName: string;
  page?: number;
  pageSize?: number;
  categoryId?: number[];
  // categoryIdList: string;
  // nextEventPageIds?: string | null;
  // startDate: string;
  // endDate: string;
  // search: string;
};

export const getCityEventTestAllList = async ({
  cityName,
  page = 1,
  pageSize = 20,
  categoryId = [],
}: // categoryIdList,
// nextEventPageIds = null,
// startDate,
// endDate,
// search
GetCityEventTestListAllProps): Promise<CityEventListReturn> => {
  const testSeq = sequelize;
  const offset = (page - 1) * pageSize;
  const events: CityEventReturn[] = [];

  const countCat = await CityEvent.count({
    include: [
      {
        model: CityEventCategory,
        as: "city_event_category",
        where: { id: { [Op.in]: categoryId } },
        through: { attributes: [] },
      },
    ],
  });

  // const totalRecords = await CityEvent.count();
  const totalPages = Math.ceil(countCat / pageSize);
  console.log("totalPages : ", totalPages);
  console.log("totalPages : ", categoryId);

  const cityEvent = await CityEvent.findAll({
    offset: offset,
    limit: pageSize,
    group: ["CityEvent.id"],
    order: [["next_timing_start_date", "ASC"]],
    include: [
      {
        model: CityEventCategory,
        attributes: ["id", "title", "open_agenda_id"],
        through: { attributes: [] },
        where: { open_agenda_id: { [Op.in]: categoryId } },
      },
      { model: CityEventTiming },
      { model: CityEventStatus },
      { model: CityEventState },
      { model: CityEventLocation },
      { model: CityEventRegistration },
      { model: CityEventOpenAgendaInfo },
    ],
  });

  console.log("getCityEventTestList cityName : ", cityName);

  if (!cityEvent) {
    throw new Error("City event not found");
  }

  cityEvent.map((event) => {
    const eventFound: CityEventReturn = {
      id: event.id,
      title: event.title,
      short_description: event.short_description,
      long_description: event.long_description,
      price: event.price,
      image_url: event.image_url,
      minimum_age: event.minimum_age,
      status: event.cityEventStatus.status_code,
      state: event.cityEventState.state_code,
      location: {
        adress: event.cityEventLocation.adress,
        city: event.cityEventLocation.city,
        postal_code: event.cityEventLocation.postal_code,
      },
      registration: {
        link: event.cityEventRegistration.link,
        email: event.cityEventRegistration.email,
        phone: event.cityEventRegistration.phone,
      },
      timings: event.city_event_timing.map((timing) => ({
        begin: timing.start_time,
        end: timing.end_time,
      })),
      nextTiming: event.next_timing_start_date,
      openAgenda: {
        uid: event.cityEventOpenAgendaInfo.event_uid,
        creator_uid: event.cityEventOpenAgendaInfo.creator_uid,
        open_agenda_created_at:
          event.cityEventOpenAgendaInfo.open_agenda_created_at,
        open_agenda_updated_at:
          event.cityEventOpenAgendaInfo.open_agenda_updated_at,
      },
      category: event.city_event_category,
      createdAt: event.createdAt,
      updatedAt: event.updatedAt,
    };

    events.push(eventFound);
  });

  return {
    total: countCat,
    events,
    nextPage: page >= totalPages ? null : page + 1,
  };
};
