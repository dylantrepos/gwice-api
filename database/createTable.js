const {
  CityEventState,
  CityEventStatus,
  CityEventCategory,
  CityEventAdress,
  CityEventTiming,
  CityEventRegistration,
  CityEventOpenAgendaInfo,
  CityEvent,
  CityEventCityEventTiming,
  CityEventCityEventCategory,
} = require("../models/cityEventModel");

const models = [
  CityEventState,
  CityEventStatus,
  CityEventCategory,
  CityEventAdress,
  CityEventTiming,
  CityEventRegistration,
  CityEventOpenAgendaInfo,
  CityEvent,
  CityEventCityEventTiming,
  CityEventCityEventCategory,
];

const initTable = async () => {
  console.log("[Database] ⌛ Creating table ...");
  try {
    for (const model of models) {
      await model.sync({ force: true });
      console.log(
        `[Database] ✅ Table ${model.tableName} successfully created`
      );
    }
    console.log("[Database] ✅ Tables successfully created\n");
  } catch (error) {
    console.log("[Database] ❌ Error creating tables : ", error);
  }
};

module.exports = initTable;
