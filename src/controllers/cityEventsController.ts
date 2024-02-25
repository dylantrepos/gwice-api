import { Request, Response } from "express";
import { checkCityNameExists, getCityNameList } from "../utils/utils";
import { client } from "../mongo/connection";
import { getCityEventDetails, getCityEventList, getCitySearchEventList } from "../services/cityEventsService";

export const cityEventListController = async (req: Request, res: Response) => {

  const cityName = req.query.cityName as string;
  const categoryIdList = (req.query.categoryIdList as string) ?? undefined;
  const nextEventPageIds = (req.query.nextEventPageIds as string) ?? null;
  const search = (req.query.search as string) ?? null
  let startDate = (req.query.startDate as string) ?? null;
  let endDate = (req.query.endDate as string) ?? null;

  console.log({startDate, endDate});
  
  if (!cityName || typeof cityName !== 'string') {
    res.status(400).send({ error: 'City is required.' });
    return;
  }

  if (!checkCityNameExists(cityName)) {
    res.status(400).send({
      error: `${cityName} is not a valid city or is not available for now. Check the list of the available cities.`,
      citiesAvailable: getCityNameList(),
    });
    return;
  }

  try {
    const events = await getCityEventList({ 
      cityName, 
      categoryIdList, 
      nextEventPageIds, 
      startDate, 
      endDate,
      search
    });
    
    res.send(events);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal server error' });
  } finally {
    await client.close();
  }
}

export const citySearchEventListController = async (req: Request, res: Response) => {

  const cityName = req.query.cityName as string;
  const nextEventPageIds = (req.query.nextEventPageIds as string) ?? null;
  const search = (req.query.search as string) ?? '';
  
  if (!cityName || typeof cityName !== 'string') {
    res.status(400).send({ error: 'City is required.' });
    return;
  }
  
  if (!search || typeof search !== 'string') {
    res.status(400).send({ error: 'Search is required.' });
    return;
  }

  if (!checkCityNameExists(cityName)) {
    res.status(400).send({
      error: `${cityName} is not a valid city or is not available for now. Check the list of the available cities.`,
      citiesAvailable: getCityNameList(),
    });
    return;
  }

  try {
    const events = await getCitySearchEventList({ cityName, nextEventPageIds, search});
    
    res.send(events);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal server error' });
  } finally {
    await client.close();
  }
}

export const cityEventDetailsController = async (req: Request, res: Response) => {
  const cityName = req.query.cityName as string;
  const eventId = (req.query.eventId as string) ?? undefined;
  
  if (!cityName || typeof cityName !== 'string') {
    res.status(400).send({ error: 'City is required.' });
    return;
  }

  if (!checkCityNameExists(cityName)) {
    res.status(400).send({
      error: `${cityName} is not a valid city or is not available for now. Check the list of the available cities.`,
      citiesAvailable: getCityNameList(),
    });
    return;
  }

  try {
    const events = await getCityEventDetails({ cityName, eventId });
    
    res.send(events);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal server error' });
  } finally {
    await client.close();
  }
}
