import { describe, expect, it } from "@jest/globals";
import moment from "moment";
import request, { Response } from "supertest";
import { ErrorMessages } from "../../../src/features/cityEvents/types/validator/Message";
import server from "../../../src/server";

const expectBody = (res: Response) => {
  expect(res.body).toHaveProperty("total");
  expect(res.body).toHaveProperty("events");
  expect(res.body).toHaveProperty("nextPage");
  expect(res.body.events.length).toBeLessThanOrEqual(20);
  expect(res.body.total).toBeGreaterThanOrEqual(res.body.events.length);
  expect(res.body.nextPage).toBeGreaterThanOrEqual(1);
};

const expectError = (res: Response, expectedErrorMessage: ErrorMessages) => {
  expect(res.statusCode).toEqual(400);
  expect(res.body).toHaveProperty("error");
  expect(res.body.error).toEqual(expectedErrorMessage);
};

describe("Request event lists", () => {
  it("[OK] should retreive next 20 events", async () => {
    const res = await request(server).get("/city-events").query({
      cityName: "Lille",
    });

    expect(res.statusCode).toEqual(200);
    expectBody(res);
  });

  it("[OK] should retreive next page", async () => {
    const res = await request(server).get("/city-events").query({
      cityName: "Lille",
      nextPage: "2",
    });

    expectBody(res);
  });

  it("[OK] should retreive event with one category", async () => {
    const res = await request(server).get("/city-events").query({
      cityName: "Lille",
      categoryId: "3",
    });

    expectBody(res);
  });

  it("[OK] should retreive event with multiple category", async () => {
    const res = await request(server).get("/city-events").query({
      cityName: "Lille",
      categoryId: "3,4,5",
    });

    expectBody(res);
  });

  it("[OK] should retreive event with search", async () => {
    const res = await request(server).get("/city-events").query({
      cityName: "Lille",
      search: "concert",
    });

    expectBody(res);
  });

  it(`[ERR] Missing cityName should return 400 with error : ${ErrorMessages.CityIsRequired}`, async () => {
    const res = await request(server).get("/city-events");

    expectError(res, ErrorMessages.CityIsRequired);
  });

  it(`[ERR] Wrong cityName should return 400 with error : ${ErrorMessages.CityNotValid}`, async () => {
    const res = await request(server).get("/city-events").query({
      cityName: "NotACity",
    });

    expectError(res, ErrorMessages.CityNotValid);
  });

  it(`[ERR] Wrong type of nextPage should return 400 with error : ${ErrorMessages.InvalidNextPageFormat}`, async () => {
    const res = await request(server).get("/city-events").query({
      cityName: "Lille",
      nextPage: "abcde",
    });

    expectError(res, ErrorMessages.InvalidNextPageFormat);
  });

  it(`[ERR] Negative nextPage should return 400 with error : ${ErrorMessages.InvalidNextPageFormat}`, async () => {
    const res = await request(server).get("/city-events").query({
      cityName: "Lille",
      nextPage: "-1",
    });

    expectError(res, ErrorMessages.InvalidNextPageFormat);
  });

  it(`[ERR] Invalid from date format should return 400 with error : ${ErrorMessages.InvalidDateFormat}`, async () => {
    const res = await request(server).get("/city-events").query({
      cityName: "Lille",
      from: "2024-03-10T23:5:00.000+02:00",
      to: "2024-03-12T23:05:00.000+02:00",
    });

    expectError(res, ErrorMessages.InvalidDateFormat);
  });

  it(`[ERR] Invalid to date format should return 400 with error : ${ErrorMessages.InvalidDateFormat}`, async () => {
    const res = await request(server).get("/city-events").query({
      cityName: "Lille",
      from: "2024-03-10T23:05:00.000+02:00",
      to: "2024-03-12T23:5:00.000+02:00",
    });

    expectError(res, ErrorMessages.InvalidDateFormat);
  });

  it(`[ERR] anterior from date should return 400 with error : ${ErrorMessages.DateMustBeInTheFuture}`, async () => {
    const from = moment().subtract(1, "day").format();
    const to = moment().add(1, "day").format();
    const res = await request(server).get("/city-events").query({
      cityName: "Lille",
      from,
      to,
    });

    expectError(res, ErrorMessages.DateMustBeInTheFuture);
  });

  it(`[ERR] from not before after date should return 400 with error : ${ErrorMessages.FromDateMustBeLessThanToDate}`, async () => {
    const from = moment().add(2, "day").format();
    const to = moment().add(1, "day").format();

    const res = await request(server).get("/city-events").query({
      cityName: "Lille",
      from,
      to,
    });

    expectError(res, ErrorMessages.FromDateMustBeLessThanToDate);
  });

  it(`[ERR] Wrong category id should return 400 with error : ${ErrorMessages.InvalidCategoryIds}`, async () => {
    const res = await request(server).get("/city-events").query({
      cityName: "Lille",
      categoryId: "abcde",
    });

    expectError(res, ErrorMessages.InvalidCategoryIds);
  });

  it(`[ERR] Wrong category id should return 400 with error : ${ErrorMessages.CategoryIdsDoesntExists}`, async () => {
    const res = await request(server).get("/city-events").query({
      cityName: "Lille",
      categoryId: "-1",
    });

    expectError(res, ErrorMessages.CategoryIdsDoesntExists);
  });

  it(`[ERR] Wrong search format should return 400 with error : ${ErrorMessages.InvalidSearchFormat}`, async () => {
    const res = await request(server).get("/city-events").query({
      cityName: "Lille",
      search: 123,
    });

    expectError(res, ErrorMessages.InvalidSearchFormat);
  });

  it(`[ERR] Search is too short should return 400 with error : ${ErrorMessages.SearchIsTooShort}`, async () => {
    const res = await request(server).get("/city-events").query({
      cityName: "Lille",
      search: "a",
    });

    expectError(res, ErrorMessages.SearchIsTooShort);
  });

  it(`[ERR] Search is too long should return 400 with error : ${ErrorMessages.SearchIsTooLong}`, async () => {
    const res = await request(server)
      .get("/city-events")
      .query({
        cityName: "Lille",
        search: "a".repeat(101),
      });

    expectError(res, ErrorMessages.SearchIsTooLong);
  });

  it(`[ERR] Invalid characters in search should return 400 with error : ${ErrorMessages.InvalidCharactersInSearch}`, async () => {
    const res = await request(server).get("/city-events").query({
      cityName: "Lille",
      search: "a@",
    });

    expectError(res, ErrorMessages.InvalidCharactersInSearch);
  });
});
