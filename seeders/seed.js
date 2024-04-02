// seed.js

const { Sequelize, DataTypes } = require("sequelize");

const { config } = require("dotenv");
const seedCityEventCategory = require("./cityEvents/category");
const seedCityEventState = require("./cityEvents/state");
const seedCityEventStatus = require("./cityEvents/status");

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

/**
 * Import all models, needed to erase previous records
 */
const Event = require("../models/cityevent")(sequelize, DataTypes);
const Adress = require("../models/cityeventadress")(sequelize, DataTypes);
const Category = require("../models/cityeventcategory")(sequelize, DataTypes);
const State = require("../models/cityeventstate")(sequelize, DataTypes);
const Status = require("../models/cityeventstatus")(sequelize, DataTypes);
const Timings = require("../models/cityeventtimings")(sequelize, DataTypes);

const seedDatabase = async () => {
  /*
   * Drop all tables
   */
  await sequelize.drop();
  await sequelize.sync();

  /**
   ** Create all tables
   */
  await seedCityEventCategory();
  await seedCityEventState();
  await seedCityEventStatus();

  await sequelize.close();
};

seedDatabase();
