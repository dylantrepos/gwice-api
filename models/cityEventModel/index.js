require("dotenv").config();
const CityEvent = require("./CityEvent");
const CityEventAdress = require("./CityEventAdress");
const CityEventCategory = require("./CityEventCategory");
const CityEventCityEventCategory = require("./CityEventCityEventCategory");
const CityEventState = require("./CityEventState");
const CityEventStatus = require("./CityEventStatus");
const CityEventTiming = require("./CityEventTiming");
const CityEventCityEventTiming = require("./CityEventCityEventTiming");
const CityEventRegistration = require("./CityEventRegistration");
const CityEventOpenAgendaInfo = require("./CityEventOpenAgendaInfo");

/**
 * Relation Many to Many
 */

// CityEvent & CityEventCategory
CityEvent.belongsToMany(CityEventCategory, {
  as: "city_event_categories",
  through: CityEventCityEventCategory,
});

CityEventCategory.belongsToMany(CityEvent, {
  as: "city_events",
  through: CityEventCityEventCategory,
});

// CityEvent & CityEventTiming
CityEvent.belongsToMany(CityEventTiming, {
  as: "city_event_timings",
  through: CityEventCityEventTiming,
});
CityEventTiming.belongsToMany(CityEvent, {
  as: "city_events",
  through: CityEventCityEventTiming,
});

module.exports = {
  CityEvent,
  CityEventAdress,
  CityEventCategory,
  CityEventCityEventCategory,
  CityEventState,
  CityEventStatus,
  CityEventTiming,
  CityEventRegistration,
  CityEventCityEventTiming,
  CityEventOpenAgendaInfo,
};
