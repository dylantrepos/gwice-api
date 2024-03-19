import { CityCoordinates } from "./Weather";

export type City = {  
  name: string;
  country: string;
  coordinates: CityCoordinates;
  cityEvents: {
    url: {
      fetchAllEvents: string;
      fetchEventDetails: string;
    };
  };
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

export type Event = {
  id: string;
  title: string | null;
  date: {
    start: string | null;
    end: string | null;
  }
  description: string | null;
  price: string | null;
  image: string | null;
  location: {
    name: string | null;
    address: string | null;
  };
  website: string | null; 
  contact?: {
    email: string | null;
    phone: string | null;
  };
  timings: {
    begin: string | null;
    end: string | null;
  }[];
  access?: string | null;
  page: string | null; 
}

export interface EventList {
  total: number;
  events: Event[];
  after: (string | number)[] | null;
  sort: string;
  success: boolean;
}