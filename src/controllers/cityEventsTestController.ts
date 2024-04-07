import { Request, Response } from "express";
import { client } from "../mongo/connection";
import { getCityEventTestList } from "../services/cityEventsTestService";
//////////
/**
 * TODO : Add city
 */
export const cityEventListTestController = async (
  req: Request,
  res: Response
) => {
  console.log("req", req);
  // const cityName = req.query.cityName as string;
  // const categoryIdList = (req.query.categoryIdList as string) ?? undefined;
  // const nextEventPageIds = (req.query.nextEventPageIds as string) ?? null;
  // const search = (req.query.search as string) ?? null;
  // let startDate = (req.query.startDate as string) ?? null;
  // let endDate = (req.query.endDate as string) ?? null;

  // console.log({ startDate, endDate });

  // if (!cityName || typeof cityName !== "string") {
  //   res.status(400).send({ error: "City is required." });
  //   return;
  // }

  // if (!checkCityNameExists(cityName)) {
  //   res.status(400).send({
  //     error: `${cityName} is not a valid city or is not available for now. Check the list of the available cities.`,
  //     citiesAvailable: getCityNameList(),
  //   });
  //   return;
  // }

  try {
    const events = await getCityEventTestList({
      // cityName,
      // categoryIdList,
      // nextEventPageIds,
      // startDate,
      // endDate,
      // search,
    });

    // const eventsUpdatedDates = events.events.map((event) => {
    //   const { timings } = event;
    //   const closestDate = timings.find(
    //     (timing) => new Date(timing.begin!) > new Date(startDate)
    //   );
    //   return {
    //     ...event,
    //     nextDate: closestDate?.begin,
    //   };
    // });

    res.send({ title: "hello" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal server error" });
  } finally {
    await client.close();
  }
};
