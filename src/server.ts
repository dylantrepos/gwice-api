import "dotenv/config.js";
import Router from "./routes/routes";
import express from 'express';
import cors from 'cors';
import bodyParser from "body-parser";
import http from 'http';

const app = express(); 
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';

app.use(cors());
app.use(bodyParser.json());
app.use(Router);

const server = http.createServer(app);


server.listen(+PORT, HOST, () => {
  console.clear();
  console.log(`🚀 Live on ${HOST}:${PORT}`);
});