require("dotenv").config();
const CityEvent = require("./CityEvent");
const CityEventAdress = require("./CityEventAdress");
const CityEventCategory = require("./CityEventCategory");
const CityEventCityEventCategory = require("./CityEventCityEventCategory");
const CityEventState = require("./CityEventState");
const CityEventStatus = require("./CityEventStatus");
const CityEventTimings = require("./CityEventTimings");

CityEvent.belongsToMany(CityEventCategory, {
  as: "city_event_categories",
  through: CityEventCityEventCategory,
});

CityEventCategory.belongsToMany(CityEvent, {
  as: "city_events",
  through: CityEventCityEventCategory,
});

module.exports = {
  CityEvent,
  CityEventAdress,
  CityEventCategory,
  CityEventCityEventCategory,
  CityEventState,
  CityEventStatus,
  CityEventTimings,
};
