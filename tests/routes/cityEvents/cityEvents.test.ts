import { describe, expect, it } from "@jest/globals";
import moment from "moment";
import request from "supertest";
import { ErrorMessages } from "../../../src/features/cityEvents/types/validator/Message";
import server from "../../../src/server";

describe("Request event lists", () => {
  it("[OK] should retreive next 20 events", async () => {
    const res = await request(server).get("/city-events").query({
      cityName: "Lille",
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("total");
    expect(res.body).toHaveProperty("events");
    expect(res.body).toHaveProperty("nextPage");
    expect(res.body.events.length).toBeLessThanOrEqual(20);
    expect(res.body.total).toBeGreaterThanOrEqual(res.body.events.length);
    expect(res.body.nextPage).toBeGreaterThanOrEqual(1);
  });

  it("[OK] should retreive next page", async () => {
    const res = await request(server).get("/city-events").query({
      cityName: "Lille",
      nextPage: 2,
    });

    expect(res.body).toHaveProperty("total");
    expect(res.body).toHaveProperty("events");
    expect(res.body).toHaveProperty("nextPage");
    expect(res.body.events.length).toBeLessThanOrEqual(20);
    expect(res.body.total).toBeGreaterThanOrEqual(res.body.events.length);
    expect(res.body.nextPage).toBeGreaterThanOrEqual(1);
  });

  it(`[ERR] Missing cityName should return 400 with error : ${ErrorMessages.CityIsRequired}`, async () => {
    const res = await request(server).get("/city-events");

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toEqual(ErrorMessages.CityIsRequired);
  });

  it(`[ERR] Wrong cityName should return 400 with error : ${ErrorMessages.CityNotValid}`, async () => {
    const res = await request(server).get("/city-events").query({
      cityName: "NotACity",
    });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toEqual(ErrorMessages.CityNotValid);
  });

  it(`[ERR] Wrong type of nextPage should return 400 with error : ${ErrorMessages.InvalidNextPageFormat}`, async () => {
    const res = await request(server).get("/city-events").query({
      cityName: "Lille",
      nextPage: "abcde",
    });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toEqual(ErrorMessages.InvalidNextPageFormat);
  });

  it(`[ERR] Negative nextPage should return 400 with error : ${ErrorMessages.InvalidNextPageFormat}`, async () => {
    const res = await request(server).get("/city-events").query({
      cityName: "Lille",
      nextPage: -1,
    });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toEqual(ErrorMessages.InvalidNextPageFormat);
  });

  it(`[ERR] Invalid from date format should return 400 with error : ${ErrorMessages.InvalidDateFormat}`, async () => {
    const res = await request(server).get("/city-events").query({
      cityName: "Lille",
      from: "2024-03-10T23:5:00.000+02:00",
      to: "2024-03-12T23:05:00.000+02:00",
    });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toEqual(ErrorMessages.InvalidDateFormat);
  });

  it(`[ERR] Invalid to date format should return 400 with error : ${ErrorMessages.InvalidDateFormat}`, async () => {
    const res = await request(server).get("/city-events").query({
      cityName: "Lille",
      from: "2024-03-10T23:05:00.000+02:00",
      to: "2024-03-12T23:5:00.000+02:00",
    });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toEqual(ErrorMessages.InvalidDateFormat);
  });

  it(`[ERR] anterior from date should return 400 with error : ${ErrorMessages.DateMustBeInTheFuture}`, async () => {
    const from = moment().subtract(1, "day").format();
    const to = moment().add(1, "day").format();
    const res = await request(server).get("/city-events").query({
      cityName: "Lille",
      from,
      to,
    });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toEqual(ErrorMessages.DateMustBeInTheFuture);
  });

  it(`[ERR] from not before after date should return 400 with error : ${ErrorMessages.FromDateMustBeLessThanToDate}`, async () => {
    const from = moment().add(2, "day").format();
    const to = moment().add(1, "day").format();

    const res = await request(server).get("/city-events").query({
      cityName: "Lille",
      from,
      to,
    });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toEqual(ErrorMessages.FromDateMustBeLessThanToDate);
  });

  it(`[ERR] Wrong category id should return 400 with error : ${ErrorMessages.InvalidCategoryIds}`, async () => {
    const res = await request(server).get("/city-events").query({
      cityName: "Lille",
      categoryId: "abcde",
    });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toEqual(ErrorMessages.InvalidCategoryIds);
  });

  it(`[ERR] Wrong category id should return 400 with error : ${ErrorMessages.CategoryIdsDoesntExists}`, async () => {
    const res = await request(server).get("/city-events").query({
      cityName: "Lille",
      categoryId: "-1",
    });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toEqual(ErrorMessages.CategoryIdsDoesntExists);
  });
});
