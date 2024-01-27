import { cities } from "../utils/citiesList";
import { displayLoadingBar, getExecutionTimeDuration } from "../utils/utils";
import { Browser } from "puppeteer";
import { EventDetails } from '../types/City';
import { extractHref, extractHrefs } from "../utils/extractData";
import { ObjectId } from "mongodb";
import { WhenQuery } from "../types/CulturalEvents";

export const getLinksForEvents = async (cityName: string, when: WhenQuery, browser: Browser) => {
  console.log(`[getLinksForEvents] ⌛ starting... `);
  const startTime = Date.now();
  const page = await browser.newPage();
  const linkList: string[] = [];

  // Navigate to the webpage
  await page.goto(cities[cityName].culturalEvents.webpages[when], { waitUntil: 'domcontentloaded' });
  
  const links = await extractHrefs(
    page, 
    cities[cityName].culturalEvents.selector.eventLinkSelector, 
    '[getLinksForEvents]',  
  ) ?? [];

  linkList.push(...links);
  
  const checkNextPagesExist = async () => {
    const href = await extractHref(
      page, 
      cities[cityName].culturalEvents.selector.nextPageLinkSelector, 
      '[getLinksForEvents]',
    )
    if (!href) return;

    await page.goto(href, { waitUntil: 'domcontentloaded' });

    const links = await extractHrefs(
      page, 
      cities[cityName].culturalEvents.selector.eventLinkSelector, 
      '[getLinksForEvents]',  
    ) ?? [];
    linkList.push(...links);

    await checkNextPagesExist();
  }

  await checkNextPagesExist();

  await page.close();

  const endTime = Date.now();
  const executionTime = (endTime - startTime) / 1000;
  console.log(`[getLinksForEvents] ✅ Done ! Found ${linkList.length} links ! Execution time: ${getExecutionTimeDuration(executionTime)}`);
  console.log(``);

  return linkList;
}

export const getEventDetails = async (
  cityName: string, 
  eventsUrl: string[], 
  browser: Browser,
  when?: WhenQuery,
): Promise<EventDetails[]> => {

  const startTime = Date.now();
  const eventDetailArr: EventDetails[] = [];
  let progress = 0;
  
  for(const url of eventsUrl) {
    console.log(`[getEventDetails][Event] ⌛ starting for ${url}... `);
    const startTime = Date.now();
    const page = await browser.newPage();
    // console.log('[URL] : ', url);
    const eventDetails: EventDetails = {
      id: new ObjectId().toString(),
      title: null,
      subtitle: null,
      date: null,
      description: null,
      image: null,
      adress: null,
      hours: null,
      link: null,
      page: url,
    };
  
    // Navigate to the webpage
    await page.goto(url, { waitUntil: 'domcontentloaded' });
  
    // Title
    const {
      titleSelector,
      subtitleSelector,
      dateSelector,
      descriptionSelector,
      imageSelector,
      adressSelector,
      hoursSelector,
      linkSelector,
    } = cities[cityName].culturalEvents.selector;

    const {
      getTitle,
      getSubtitle,
      getDate,
      getDescription,
      getImage,
      getAdress,
      getHours,
      getLink,
    } = cities[cityName].culturalEvents.extractDataMethods;
    
    eventDetails.title = await getTitle(page, titleSelector);
    eventDetails.subtitle = await getSubtitle(page, subtitleSelector);
    eventDetails.date = await getDate(page, dateSelector);
    eventDetails.description = await getDescription(page, descriptionSelector);
    eventDetails.image = await getImage(page, imageSelector);
    eventDetails.adress = await getAdress(page, adressSelector);
    eventDetails.hours = await getHours(page, hoursSelector);
    eventDetails.link = await getLink(page, linkSelector);

    console.log('eventDetails', eventDetails);

    if (when) {
      const endTime = Date.now();
      const executionTime = (endTime - startTime) / 1000;
      displayLoadingBar(when, progress + 1, eventsUrl.length, executionTime);
    }

    progress++;
    
    eventDetailArr.push(eventDetails);
    await page.close();

    const endTime = Date.now();
    const executionTime = (endTime - startTime) / 1000;
    console.log(`[getEventDetails][Event] ✅ Done for ${url} ! Execution time: ${getExecutionTimeDuration(executionTime)}`);
    console.log(``);
  };

  const endTime = Date.now();
  const executionTime = (endTime - startTime) / 1000;
  console.log(`[getEventDetails] ✅ Done ! Execution time: ${getExecutionTimeDuration(executionTime)}`);
  console.log(``);

  return eventDetailArr;
}

