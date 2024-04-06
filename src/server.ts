import bodyParser from "body-parser";
import cors from "cors";
import "dotenv/config.js";
import express from "express";
import http from "http";
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

// config();

// if (!process.env.DATABASE_URL) {
//   throw new Error("DATABASE_URL is not set");
// }
// const sequelize = new Sequelize(process.env.DATABASE_URL, {
//   dialectOptions: { ssl: { require: true } },
// });

// // Set up the models
// const Category = require("../models/cityeventcategory.js")(
//   sequelize,
//   DataTypes
// );

// app.get("/db/city-event-category", async (_, res) => {
//   try {
//     const cityEventCategories = await Category.findAll();
//     res.json(cityEventCategories);
//   } catch (error) {
//     console.error("Error fetching cityEventCategory:", error);
//     res.status(500).send("Error fetching cityEventCategory");
//   }
// });

// app.get("/db/city-event-category/:category_name", async (req, res) => {
//   const categoryName = parseInt(req.params.category_name);
//   try {
//     const cityEventCategory = await Category.findAll({
//       where: {
//         name: categoryName,
//       },
//     });
//     res.json(cityEventCategory);
//   } catch (error) {
//     console.error("Error fetching categoryId for cityEventCategory:", error);
//     res.status(500).send("Error fetching categoryId for cityEventCategory");
//   }
// });

server.listen(+PORT, HOST, () => {
  console.clear();
  console.log(`🚀 Live on ${HOST}:${PORT}`);
});
