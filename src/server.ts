import bodyParser from "body-parser";
import cors from "cors";
import "dotenv/config.js";
import express from "express";
import http from "http";
import { morganMiddleware } from "./logger/logger";
import Router from "./routes/routes";

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "localhost";

app.use(cors());
app.use(bodyParser.json());
app.use(morganMiddleware);

app.use(Router);

const server = http.createServer(app);

server.listen(+PORT, HOST, () => {
  console.clear();
  console.log(`🚀 Live on ${HOST}:${PORT}`);
});
