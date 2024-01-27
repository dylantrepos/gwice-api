import { CityCoordinates } from "./Weather";

export type Cities = {
  [cityName: string]: {
    name: string;
    country: string;
    coordinates: CityCoordinates;
    culturalEvents: {
      webpages: {
        default: string;
        today: string;
        week: string;
        weekend: string;
        month: string;
      },
      webPageURLPrefix: string;
      webPageEventsListSelector: string;
      selector: {
        eventLinkSelector: string;
        nextPageLinkSelector: string;
        titleSelector: string;
        subtitleSelector: string;
        dateSelector: string;
        descriptionSelector: string;
        imageSelector: string;
        adressSelector: string;
        hoursSelector: string;
        linkSelector: string;
      },
      extractDataMethods: {
        getTitle: (page: any, selector: string) => Promise<string | null>;
        getSubtitle: (page: any, selector: string) => Promise<string | null>;
        getDate: (page: any, selector: string) => Promise<string | null>;
        getDescription: (page: any, selector: string) => Promise<string[] | null>;
        getImage: (page: any, selector: string) => Promise<string | null>;
        getAdress: (page: any, selector: string) => Promise<string[] | null>;
        getHours: (page: any, selector: string) => Promise<string[] | null>;
        getLink: (page: any, selector: string) => Promise<string | null>;
      }
    }
  }
}

export type EventDetails = {
  id: string;
  title: string | null;
  subtitle: string | null;
  date: string | null;
  description: (string | string[])[] | null;
  image: string | null;
  adress: (string | null | undefined)[] | null;
  hours: (string | null)[] | null;
  link: string | null;
  page: string | null;
}