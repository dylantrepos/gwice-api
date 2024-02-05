import { Request, Response } from "express";
import { checkCityNameExists, cityDoesNotExist, getCityNameList } from "../utils/utils";
import { client } from "../mongo/connection";
import { cityList } from "../city/cityList";
import { getCityEvents } from "../services/cityEventsService";

export const cityEventController = async (req: Request, res: Response) => {
  const cityName = req.query.cityName as string;
  const categoryIdList = (req.query.categoryIdList as string) ?? undefined;
  
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
    // await client.connect();
    // const collection = client.db("gwice").collection('lille');
    // console.log({ collection });
    const events = await getCityEvents({ cityName, categoryIdList });
    
    // const culturalEvents = await collection.findOne({}, { projection: { [`culturalEvents.events`]: 1 } });

    // console.log('events: ', events);
    res.send(events);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal server error' });
  } finally {
    await client.close();
  }
}
