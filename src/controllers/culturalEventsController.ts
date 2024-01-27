import { Request, Response } from "express";
import { citiesList } from "../utils/citiesList";
import { cityDoesNotExist, timeQueries } from "../utils/utils";
import { WhenQuery } from "../types/CulturalEvents";
import { client } from "../mongo/connection";

export const culturalEventsController = async (req: Request, res: Response) => {
  const cityQuery = req.query.city;
  let whenQuery = req.query?.when ?? 'today';

  if (!timeQueries.includes(whenQuery as WhenQuery)) {
    res.status(400).send({ error: 'When period is not valid.' });
    return;
  }

  if (Array.isArray(whenQuery)) whenQuery = whenQuery[0] as string;
  
  if (!cityQuery || typeof cityQuery !== 'string') {
    res.status(400).send({ error: 'City is required.' });
    return;
  }

  if (cityDoesNotExist(cityQuery)) {
    res.status(400).send({
      error: `${cityQuery} is not a valid city or is not available for now. Check the list of the available cities.`,
      citiesAvailable: citiesList,
    });
    return;
  }

  try {
    await client.connect();
    const collection = client.db("gwice").collection('lille');
    console.log({ collection });

    const culturalEvents = await collection.findOne({}, { projection: { [`culturalEvents.${whenQuery}`]: 1 } });
    
    res.send({events: culturalEvents?.culturalEvents[whenQuery as string]['$each']});
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal server error' });
  } finally {
    await client.close();
  }
}
