import bodyParser from "body-parser";
import cors from "cors";
import { config } from "dotenv";
import "dotenv/config.js";
import express from "express";
import http from "http";
import { DataTypes, Sequelize } from "sequelize";
import Router from "./routes/routes";

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "localhost";

app.use(cors());
app.use(bodyParser.json());
app.use(Router);

const server = http.createServer(app);

/**
 ** Postgres Sequelize connection
 */

config();

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialectOptions: { ssl: { require: true } },
});

// Set up the models
const Author = require("../models/author")(sequelize, DataTypes);
const Book = require("../models/book")(sequelize, DataTypes);

// Create a new Express application
app.get("/", async (_, res) => {
  res.send("Hello World! This is a book catalog.");
});

app.get("/authors", async (_, res) => {
  try {
    const authors = await Author.findAll();
    res.json(authors);
  } catch (error) {
    console.error("Error fetching authors:", error);
    res.status(500).send("Error fetching authors");
  }
});

app.get("/books/:author_id", async (req, res) => {
  const authorId = parseInt(req.params.author_id);
  try {
    const books = await Book.findAll({
      where: {
        authorId: authorId,
      },
    });
    res.json(books);
  } catch (error) {
    console.error("Error fetching books for author:", error);
    res.status(500).send("Error fetching books for author");
  }
});

server.listen(+PORT, HOST, () => {
  console.clear();
  console.log(`🚀 Live on ${HOST}:${PORT}`);
});
