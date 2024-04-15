// import { CityEvent } from "../../models/cityEventModel";

import moment from "moment";
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

  const nextTiming = cityEvent.city_event_timing.find((timing) => {
    const startTime = moment(timing.start_time);
    const endTime = moment(timing.end_time);
    return (
      startTime.isSameOrAfter(moment().startOf("day")) &&
      endTime.isAfter(moment().add(2, "hour"))
    );
    // must be today or in the future
    // timing.end_time  doit etre superieur a la date et l'heure actuelle
  });

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
    nextTiming: {
      begin: nextTiming?.start_time.toISOString() ?? "",
      end: nextTiming?.end_time.toISOString() ?? "",
    },
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
      begin: timing.start_time.toISOString(),
      end: timing.end_time.toISOString(),
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
};

type GetCityEventTestListAllProps = {
  cityName: string;
  page?: number;
  pageSize?: number;
  categoryId?: number[];
  from: Date;
  to: Date;
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
  from,
  to,
}: GetCityEventTestListAllProps): Promise<CityEventListReturn> => {
  const testSeq = sequelize;
  const offset = (page - 1) * pageSize;
  const events: CityEventReturn[] = [];

  console.log("here : ", { cityName, from, to, categoryId, page, pageSize });

  const cityEvent = await CityEvent.findAndCountAll({
    // group: ["CityEvent.id"],
    distinct: true,
    col: "id",
    include: [
      {
        model: CityEventCategory,
        attributes: ["id", "title", "open_agenda_id"],
        as: "city_event_category",
        through: { attributes: [] },
        where: { open_agenda_id: { [Op.in]: categoryId } },
      },
      {
        model: CityEventTiming,
        as: "city_event_timing",
        through: { attributes: [] },
        where: {
          [Op.and]: [
            {
              start_time: {
                [Op.gte]: moment(from).startOf("day"),
              },
            },
            {
              end_time: {
                [Op.lte]: to,
              },
            },
            {
              end_time: {
                [Op.gt]: moment(),
              },
            },
          ],
        },
      },
      { model: CityEventStatus },
      { model: CityEventState },
      { model: CityEventLocation },
      { model: CityEventRegistration },
      { model: CityEventOpenAgendaInfo },
    ],
    order: [
      [
        { model: CityEventTiming, as: "city_event_timing" },
        "start_time",
        "ASC",
      ],
    ],
    offset: offset,
    limit: pageSize,
    subQuery: false,
    // logging: console.log,
  });

  if (!cityEvent) {
    throw new Error("City event not found");
  }

  const totalPages = Math.ceil(cityEvent.count / pageSize);

  const eventWithCategories = [];
  const findAndAddCategories = async (event: CityEvent) => {
    const categories = await CityEvent.findOne({
      where: { id: event.id },
      include: [
        {
          model: CityEventCategory,
          attributes: ["id", "title", "open_agenda_id"],
          as: "city_event_category",
          through: { attributes: [] },
        },
      ],
      subQuery: false,
    });

    const nextTiming = event.city_event_timing.find((timing) => {
      const startTime = moment(timing.start_time);
      const endTime = moment(timing.end_time);

      return (
        startTime.isSameOrAfter(moment().startOf("day")) &&
        endTime.isAfter(moment())
      );
    });

    if (!categories) return null;

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
        begin: moment(timing.start_time).format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
        end: moment(timing.end_time).format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
      })),
      nextTiming: {
        begin:
          moment(nextTiming?.start_time).format("YYYY-MM-DDTHH:mm:ss.SSSZ") ??
          null,
        end:
          moment(nextTiming?.end_time).format("YYYY-MM-DDTHH:mm:ss.SSSZ") ??
          null,
      },
      openAgenda: {
        uid: event.cityEventOpenAgendaInfo.event_uid,
        creator_uid: event.cityEventOpenAgendaInfo.creator_uid,
        open_agenda_created_at:
          event.cityEventOpenAgendaInfo.open_agenda_created_at,
        open_agenda_updated_at:
          event.cityEventOpenAgendaInfo.open_agenda_updated_at,
      },

      category: categories.city_event_category,
      createdAt: event.createdAt,
      updatedAt: event.updatedAt,
    };

    return eventFound;
  };

  for (const event of cityEvent.rows) {
    const eventFound = await findAndAddCategories(event);
    if (eventFound) eventWithCategories.push(eventFound);
  }

  return {
    total: cityEvent.count,
    events: eventWithCategories,
    nextPage: page >= totalPages ? null : page + 1,
  };
};
