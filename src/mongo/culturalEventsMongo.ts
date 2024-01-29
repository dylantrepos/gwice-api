import { cityDoesNotExist, timeQueries } from "../utils/utils";
import { MongoClient } from "mongodb";
import puppeteer from "puppeteer";
import {  getEvents, getLinksForEvents } from "../services/culturalEventsService";
import { WhenQuery } from "../types/CulturalEvents";

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
  
  const collection = client.db("gwice").collection('lille');
  
  const browser = await puppeteer.launch({ headless: 'new' });

  const linksEvent = await getLinksForEvents(cityName, when as WhenQuery, browser);

  // const events = await getEventDetails(cityName, linksEvent, browser, when);
  const events = await getEvents(cityName, linksEvent, browser);

  browser.close();

  try {
    await collection.updateOne(
      { name: 'lille' }, // filter
      { $unset: { [`culturalEvents.events`]: "" }} // update
    );

    const result = await collection.updateOne(
      { name: 'lille' }, // filter
      { $set: { [`culturalEvents.events`]: {$each: events} } }, // update
      { upsert: true } // options
    );

    console.log(`Successfully inserted item with _id: ${result.matchedCount}`);
    
  } catch (error) {
    console.log(error);
  }
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