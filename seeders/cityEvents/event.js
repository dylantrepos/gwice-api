// seed.js

const { Sequelize, DataTypes } = require("sequelize");

const { config } = require("dotenv");

config();

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
    },
  },
});

const Event = require("../../models/cityEvent")(sequelize, DataTypes);

const seedDatabase = async () => {
  await Event.create({
    title: "Event 1",
    shortDescription: "Short description of event 1",
    longDescription: "Long description of event 1",
    categoryId: 1,
  });

  await sequelize.close();
};

seedDatabase();
