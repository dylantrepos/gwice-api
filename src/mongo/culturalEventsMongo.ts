import { cityDoesNotExist, timeQueries } from "../utils/utils";
import { MongoClient } from "mongodb";
import { getLinksForEventsInfoLocal } from "../services/cityEventsService";
import { WhenQuery } from "../types/CulturalEvents";

import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';


export const addEventsCulturalToMongo = async (cityName: string, when: WhenQuery = 'default', client: MongoClient) => {
  if (!timeQueries.includes(when)) {
    console.log({ error: 'When period is not valid.' });
    return;
  }

  if (cityDoesNotExist(cityName)) {
    console.log(`${cityName} is not a valid city or is not available for now. Check the list of the available cities.`);
    return;
  }

  cityName = cityName.toLowerCase() as string;
  
  // @ts-ignore
  // const collection = client.db("gwice").collection('lille');
  puppeteer.use(StealthPlugin());
  
  // const browser = await puppeteer.launch({ headless: false });

  // const events = await getLinksForEventsInfoLocal('lille', 'default', browser);



  // const linksEvent = await getLinksForEvents(cityName, when as WhenQuery, browser);

  // const events = await getEvents(cityName, linksEvent, browser);

  // browser.close();

  // try {
  //   await collection.updateOne(
  //     { name: 'lille' }, // filter
  //     { $unset: { [`culturalEvents.eventsLocal`]: "" }} // update
  //   );

  //   const result = await collection.updateOne(
  //     { name: 'lille' }, // filter
  //     { $set: { [`culturalEvents.eventsLocal`]: {$each: events} } }, // update
  //     { upsert: true } // options
  //   );

  //   console.log(`Successfully inserted item with _id: ${result.matchedCount}`);
    
  // } catch (error) {
  //   console.log(error);
  // }

  // try {
  //   await collection.updateOne(
  //     { name: 'lille' }, // filter
  //     { $unset: { [`culturalEvents.events`]: "" }} // update
  //   );

  //   const result = await collection.updateOne(
  //     { name: 'lille' }, // filter
  //     { $set: { [`culturalEvents.events`]: {$each: events} } }, // update
  //     { upsert: true } // options
  //   );

  //   console.log(`Successfully inserted item with _id: ${result.matchedCount}`);
    
  // } catch (error) {
  //   console.log(error);
  // }




  // try {
  //   await collection.updateOne(
  //     { name: 'lille' }, // filter
  //     { $unset: { [`culturalEvents.${when}`]: "" }} // update
  //   );

  //   const result = await collection.updateOne(
  //     { name: 'lille' }, // filter
  //     { $set: { [`culturalEvents.${when}`]: {$each: events} } }, // update
  //     { upsert: true } // options
  //   );

  //   console.log(`Successfully inserted item with _id: ${result.matchedCount}`);
    
  // } catch (error) {
  //   console.log(error);
  // }
} 