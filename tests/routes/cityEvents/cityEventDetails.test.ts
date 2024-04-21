import { describe, expect, it } from "@jest/globals";
import request, { Response } from "supertest";
import { ErrorMessages } from "../../../src/features/cityEvents/types/validator/Message";
import server from "../../../src/server";

const expectError = (res: Response, expectedErrorMessage: ErrorMessages) => {
  expect(res.statusCode).toEqual(400);
  expect(res.body).toHaveProperty("error");
  expect(res.body.error).toEqual(expectedErrorMessage);
};

describe("[CityEventDetails]", () => {
  it("[OK] Should retreive event with correct id", async () => {
    const res = await request(server).get("/city-event-details").query({
      cityName: "Lille",
      eventId: 1,
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("id");
  });

  it(`[ERR] Missing eventId should return 400 with error : ${ErrorMessages.EventIdIsRequired}`, async () => {
    const res = await request(server).get("/city-event-details").query({
      cityName: "Lille",
    });

    expectError(res, ErrorMessages.EventIdIsRequired);
  });

  it(`[ERR] Wrong eventId should return 400 with error : ${ErrorMessages.InvalidEventId}`, async () => {
    const res = await request(server).get("/city-event-details").query({
      cityName: "Lille",
      eventId: 9999999,
    });

    expectError(res, ErrorMessages.InvalidEventId);
  });

  it(`[ERR] Wrong type of eventId should return 400 with error : ${ErrorMessages.InvalidEventIdFormat}`, async () => {
    const res = await request(server).get("/city-event-details").query({
      cityName: "Lille",
      eventId: "abcde",
    });

    expectError(res, ErrorMessages.InvalidEventIdFormat);
  });

  it(`[ERR] Missing cityName should return 400 with error : ${ErrorMessages.CityIsRequired}`, async () => {
    const res = await request(server).get("/city-event-details").query({
      eventId: 1,
    });

    expectError(res, ErrorMessages.CityIsRequired);
  });

  it(`[ERR] Wrong cityName should return 400 with error : ${ErrorMessages.CityNotValid}`, async () => {
    const res = await request(server).get("/city-event-details").query({
      cityName: "NotACity",
      eventId: 1,
    });

    expectError(res, ErrorMessages.CityNotValid);
  });
});
