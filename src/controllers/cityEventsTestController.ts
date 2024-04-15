import { Request, Response } from "express";
import moment from "moment";
import { client } from "../mongo/connection";
import { CATEGORIES } from "../seeder/data/Constant";
import {
  getCityEventTestAllList,
  getCityEventTestList,
} from "../services/cityEventsTestService";
//////////

export const cityEventListTestController = async (
  req: Request,
  res: Response
) => {
  console.log("req", req);
  const cityName = (req.query.cityName as string) ?? "";
  const eventId = (req.query.eventId as string) ?? "";
  /**
   * TODO : Implement middleware/validator
   */

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

export const cityEventListTestAllController = async (
  req: Request,
  res: Response
) => {
  console.log("req.query", req.query);
  const cityName = req.query.cityName as string;
  const page = +(req.query.page ?? 1);
  const pageSize = +(req.query.pageSize ?? 20);
  const from =
    moment.utc((req.query.from as string)?.split("+")[0]).toDate() ?? moment();
  const to = req.query.to
    ? moment.utc((req.query.to as string)?.split("+")[0]).toDate()
    : moment().add(10, "years").toDate();
  const categoryIdReq: string = (req.query.categoryId as string)?.trim() ?? "";

  const categoryId: number[] =
    categoryIdReq.length > 0
      ? categoryIdReq.split(",").map((item) => +item)
      : CATEGORIES.map((category) => category.open_agenda_id);

  try {
    const events = await getCityEventTestAllList({
      cityName,
      page,
      pageSize,
      categoryId,
      from,
      to,
      // categoryIdList,
      // nextEventPageIds,
      // startDate,
      // endDate,
      // search,
    });

    res.send(events);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal server error" });
  } finally {
    await client.close();
  }
};
