import { describe, expect, it } from "@jest/globals";
import request from "supertest";
import server from "../../src/server";

describe("Testing the server connexion", () => {
  it("Server should be online", async () => {
    const res = await request(server).get("/");

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("status");
    expect(res.body.status).toBe(1);
  });
});
