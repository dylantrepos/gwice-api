import { Request, Response } from "express";
import moment from "moment";
import { client } from "../../../mongo/connection";
import { CATEGORIES } from "../../../seeder/data/Constant";
import { getCityEvents } from "../services/cityEventsService";

export const cityEventsController = async (req: Request, res: Response) => {
  const cityName = req.query.cityName as string;
  const page = +(req.query.page ?? 1);
  const pageSize = +(req.query.pageSize ?? 20);
  const from =
    moment.utc((req.query.from as string)?.split("+")[0]).toDate() ?? moment();
  const to = req.query.to
    ? moment.utc((req.query.to as string)?.split("+")[0]).toDate()
    : moment().add(10, "years").toDate();
  const search = (req.query.search as string)?.trim() ?? null;
  const categoryIdReq: string =
    (req.query.categoryId as string)?.trim() ?? null;

  const categoryId: number[] = categoryIdReq
    ? categoryIdReq.split(",").map((item) => +item)
    : CATEGORIES.map((category) => category.open_agenda_id);

  try {
    const events = await getCityEvents({
      cityName,
      page,
      pageSize,
      categoryId,
      from,
      to,
      search,
    });

    res.send(events);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal server error" });
  } finally {
    await client.close();
  }
};
