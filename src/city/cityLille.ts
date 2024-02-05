import { City } from "../types/City";

export const Lille: City = {
    name: "Lille",
    country: "FR",
    coordinates: {
      longitude: '3.05725',
      latitude: '50.63134'
    },
    cityEvents: {
      fetchBaseUrlAllEvents: `https://api.openagenda.com/v2/agendas/89904399/events?key=${process.env.OPEN_AGENDA_API_KEY}&includeLabels=true&includeFields[]=uid&includeFields[]=title&includeFields[]=location.city&includeFields[]=image.base&includeFields[]=image.filename&includeFields[]=categories-metropolitaines&includeFields[]=firstTiming.begin&includeFields[]=description`
    },
}