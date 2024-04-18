import moment from "moment";
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
import { CityEventReturn } from "../types/CityEvents";

type GetCityEventDetailsProps = {
  cityName: string;
  eventId: string;
};

export const getCityEventDetails = async ({
  eventId,
}: GetCityEventDetailsProps): Promise<CityEventReturn> => {
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
