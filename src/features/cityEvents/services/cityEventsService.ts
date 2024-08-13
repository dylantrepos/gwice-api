// import { CityEvent } from "../../models/cityEventModel";

import moment from "moment";
import { Op, Sequelize } from "sequelize";
import sequelize from "../../../database/getConnexion";
import {
  CityEvent,
  CityEventCategory,
  CityEventLocation,
  CityEventOpenAgendaInfo,
  CityEventRegistration,
  CityEventState,
  CityEventStatus,
  CityEventTiming,
} from "../../../models/cityEventModel/index";
import { CityEventListReturn, CityEventReturn } from "../types/CityEvents";
import { TypeTitle } from "../types/Constant";

type GetCityEventsProps = {
  cityName: string;
  page?: number;
  pageSize?: number;
  categoryId?: number[];
  from: Date;
  to: Date;
  search: string | null;
  type: TypeTitle | null;
};

export const getCityEvents = async ({
  page = 1,
  pageSize = 20,
  categoryId = [],
  from,
  to,
  search = null,
  type = TypeTitle.Coming,
}: GetCityEventsProps): Promise<CityEventListReturn> => {
  const testSeq = sequelize;
  const offset = (page - 1) * pageSize;
  const whereClause = search
    ? {
        [Op.or]: [
          Sequelize.where(
            Sequelize.fn("lower", Sequelize.col("CityEvent.title")),
            {
              [Op.regexp]: `\\y${search.toLowerCase()}\\y`,
            }
          ),
          Sequelize.where(
            Sequelize.fn("lower", Sequelize.col("CityEvent.long_description")),
            { [Op.regexp]: `\\y${search.toLowerCase()}\\y` }
          ),
        ],
      }
    : {};

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
                [Op.gte]:
                  type === TypeTitle.Current
                    ? moment(from).startOf("day")
                    : moment(from).utc().toDate(),
              },
            },
            {
              end_time: {
                [Op.lte]:
                  type === TypeTitle.Current ? moment(from).endOf("day") : to,
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
    where: whereClause,
    // logging: console.log,
  });

  if (!cityEvent) {
    throw new Error("City event not found");
  }

  const totalPages = Math.ceil(cityEvent.count / pageSize);

  const eventWithCategories = [];
  const findAndAddCategories = async (event: CityEvent, index: number) => {
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
      // @ts-ignore
      keyPosition: index + offset,
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

  for (const [index, event] of cityEvent.rows.entries()) {
    const eventFound = await findAndAddCategories(event, index);
    if (eventFound) eventWithCategories.push(eventFound);
  }

  return {
    total: cityEvent.count,
    events: eventWithCategories,
    nextPage: page >= totalPages ? null : page + 1,
  };
};
