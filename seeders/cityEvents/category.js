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

const Category = require("../../models/cityeventcategory")(
  sequelize,
  DataTypes
);

const CATEGORY = [
  "workshop",
  "sale",
  "ceremony",
  "cinema",
  "conference",
  "municipalCouncil",
  "dance",
  "sustainableDevelopment",
  "employment",
  "exhibition",
  "festival",
  "training",
  "lecture",
  "fashion",
  "music",
  "publicMeeting",
  "health",
  "show",
  "sport",
  "theater",
  "visit",
  "none",
];

const seedDatabase = async () => {
  await Promise.all(
    CATEGORY.map(async (category) => {
      await Category.create({
        name: category,
      });
    })
  );

  await sequelize.close();
};

seedDatabase();
