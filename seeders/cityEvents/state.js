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

const State = require("../../models/cityeventstate")(sequelize, DataTypes);

const STATE = [
  { state: "Scheduled", stateCode: 1 },
  { state: "Rescheduled", stateCode: 2 },
  { state: "Moved online", stateCode: 3 },
  { state: "Postponed", stateCode: 4 },
  { state: "Complete", stateCode: 5 },
  { state: "Canceled", stateCode: 6 },
];

const seedDatabase = async () => {
  STATE.map(async (stateItem) => {
    const { state, stateCode } = stateItem;
    await State.create({
      state,
      stateCode,
    });
  });
};

module.exports = seedDatabase;
