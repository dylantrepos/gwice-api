import { Page } from "puppeteer"
import { Cities } from "../types/City"
import { extractAdressData, extractDescriptionData, extractHoursData, extractImageSrc } from "./lille/extractCulturalEventsDatas"
import { extractHref, extractString } from "./extractData"

export const citiesList = [
  "lille", "quimper"
]

export const cities: Cities = {
  "lille": {
    name: "Lille",
    country: "FR",
    coordinates: {
      longitude: '3.05725',
      latitude: '50.63134'
    },
    culturalEvents: {
      webpages: {
        default: 'https://www.lille.fr/Evenements/',
        today: 'https://www.lille.fr/Evenements/(when)/today',
        week: 'https://www.lille.fr/Evenements/(when)/week',
        weekend: 'https://www.lille.fr/Evenements/(when)/weekend',
        month: 'https://www.lille.fr/Evenements/(when)/month',
      },
      webPageURLPrefix: 'http://www.lille.fr',
      webPageEventsListSelector: '.actusMaster',
      selector: {
        eventLinkSelector: '.actusMaster .evenement .voirActus',
        nextPageLinkSelector: '.actusMaster .pagination .next',
        titleSelector: '.content > h1',
        subtitleSelector: '.chapo p',
        dateSelector: '.dateInfo span',
        descriptionSelector: '.rte p',
        imageSelector: '.figureContain img',
        adressSelector: '.adress p',
        hoursSelector: '.columnRight .textAlone',
        linkSelector: '.columnRight a',
      },
      extractDataMethods: {
        getTitle: async (page: Page, selector: string) => extractString(page, selector, '[getEventDetails][Event]'),
        getSubtitle: async (page: Page, selector: string) => extractString(page, selector, '[getEventDetails][Event]'),
        getDate: async (page: Page, selector: string) => extractString(page, selector, '[getEventDetails][Event]'),
        getDescription: async (page: Page, selector: string) => extractDescriptionData(page, selector),
        getImage: async (page: Page, selector: string) => extractImageSrc(page, selector),
        getAdress: async (page: Page, selector: string) => extractAdressData(page, selector),
        getHours: async (page: Page, selector: string) => extractHoursData(page, selector),
        getLink: async (page: Page, selector: string) => extractHref(page, selector, '[getEventDetails][Event]'),
      }
    }
  },
}

