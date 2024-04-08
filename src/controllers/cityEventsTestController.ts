import { Request, Response } from "express";
import { client } from "../mongo/connection";
import { CATEGORIES } from "../seeder/data/Constant";
import {
  getCityEventTestAllList,
  getCityEventTestList,
} from "../services/cityEventsTestService";
import { checkCityNameExists, getCityNameList } from "../utils/utils";
//////////
/**
 * TODO : Add city
 */
export const cityEventListTestController = async (
  req: Request,
  res: Response
) => {
  console.log("req", req);
  const cityName = req.query.cityName as string;
  const eventId = req.query.id as string;
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
      cityName,
      eventId,
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

    res.send(events);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal server error" });
  } finally {
    await client.close();
  }
};

/**
 * TODO : Add city
 */
export const cityEventListTestAllController = async (
  req: Request,
  res: Response
) => {
  console.log("req", req);
  const cityName = req.query.cityName as string;
  const page = +(req.query.page ?? 1);
  const pageSize = +(req.query.pageSize ?? 20);
  const categoryIdReq: string = (req.query.categoryId as string)?.trim() ?? "";
  let categoryId: number[] = [];
  // const categoryIdList = (req.query.categoryIdList as string) ?? undefined;
  // const nextEventPageIds = (req.query.nextEventPageIds as string) ?? null;
  // const search = (req.query.search as string) ?? null;
  // let startDate = (req.query.startDate as string) ?? null;
  // let endDate = (req.query.endDate as string) ?? null;

  // console.log({ startDate, endDate });

  if (!cityName || typeof cityName !== "string") {
    res.status(400).send({ error: "City is required." });
    return;
  }

  if (!checkCityNameExists(cityName)) {
    res.status(400).send({
      error: `${cityName} is not a valid city or is not available for now. Check the list of the available cities.`,
      citiesAvailable: getCityNameList(),
    });
    return;
  }

  /**
   * ! Faire les category id string en number
   * ! Check si c'est un nombre et que ca marche
   */
  const validCategoryIds = CATEGORIES.map(
    (category) => category.open_agenda_id
  );

  if (categoryIdReq.length > 0) {
    console.log("categoryIdReq :", categoryIdReq);
    const categoryIdArr = categoryIdReq
      .split(",")
      .filter((item) => item.trim() !== "")
      .map((item) => +item);
    console.log("categoryIdArr :", categoryIdArr);
    const allAreNumbers = categoryIdArr.every((item) => !isNaN(Number(item)));
    console.log("allAreNumbers :", allAreNumbers);
    if (!allAreNumbers) {
      res
        .status(400)
        .send({ error: "Category id must be numbers like '1,2,3'" });
      return;
    }

    const allAreValid = categoryIdArr.every((item) =>
      validCategoryIds.includes(item)
    );
    console.log("allAreValid :", allAreValid);

    if (!allAreValid) {
      res.status(400).send({ error: "Category ids doesn't exists" });
      return;
    }

    categoryId = [...categoryIdArr];
    console.log("categoryId final :", categoryId);
  } else {
    categoryId = [...validCategoryIds];
  }

  try {
    const events = await getCityEventTestAllList({
      cityName,
      page,
      pageSize,
      categoryId,
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

    res.send(events);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal server error" });
  } finally {
    await client.close();
  }
};
