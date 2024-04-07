import "dotenv/config.js";
import { Sequelize } from "sequelize-typescript";
import { CityEventLocation } from "../models/cityEventModel";
import { CityEvent } from "../models/cityEventModel/CityEvent";
import { CityEventCategory } from "../models/cityEventModel/CityEventCategory";
import { CityEventCityEventCategory } from "../models/cityEventModel/CityEventCityEventCategory";
import { CityEventCityEventTiming } from "../models/cityEventModel/CityEventCityEventTiming";
import { CityEventOpenAgendaInfo } from "../models/cityEventModel/CityEventOpenAgendaInfo";
import { CityEventRegistration } from "../models/cityEventModel/CityEventRegistration";
import { CityEventState } from "../models/cityEventModel/CityEventState";
import { CityEventStatus } from "../models/cityEventModel/CityEventStatus";
import { CityEventTiming } from "../models/cityEventModel/CityEventTiming";

console.log("process.env.PGDATABASE", process.env);

const sequelize = new Sequelize({
  database: process.env.PGDATABASE,
  username: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  dialect: "postgres",
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  models: [
    CityEventState,
    CityEventStatus,
    CityEventTiming,
    CityEventLocation,
    CityEventCategory,
    CityEventOpenAgendaInfo,
    CityEventRegistration,
    CityEvent,
    CityEventCityEventCategory,
    CityEventCityEventTiming,
  ],
});

export default sequelize;
