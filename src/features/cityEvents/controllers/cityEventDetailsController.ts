import { Request, Response } from "express";
import { client } from "../../../mongo/connection";
import { getCityEventDetails } from "../services/cityEventDetailsService";

export const cityEventDetailsController = async (
  req: Request,
  res: Response
) => {
  const cityName = (req.query.cityName as string) ?? "";
  const eventId = (req.query.eventId as string) ?? "";

  try {
    const events = await getCityEventDetails({
      cityName,
      eventId,
    });

    res.send(events);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal server error" });
  } finally {
    await client.close();
  }
};
