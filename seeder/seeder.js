const { status, states, categories } = require("./data/cityEventData");
const {
  CityEventState,
  CityEventStatus,
  CityEventCategory,
  CityEventAdress,
  CityEventTimings,
  CityEvent,
  CityEventCityEventCategory,
} = require("../models/cityEventModel");

const seedData = async () => {
  try {
    console.log("[Database] Syncing database ...");
    await CityEventState.sync({ force: true });
    await CityEventStatus.sync({ force: true });
    await CityEventCategory.sync({ force: true });
    await CityEventAdress.sync({ force: true });
    await CityEventTimings.sync({ force: true });
    await CityEvent.sync({ force: true });
    await CityEventCityEventCategory.sync({ force: true });
    console.log("[Database] ✅ Database successfully synced");
    console.log("[Seeder] ----------------------------------------");
    console.log("[Seeder] Creating CityEventStatus ...");
    await CityEventStatus.bulkCreate(status, { validate: true });
    console.log("[Seeder] ✅ CityEventStatus successfully created");
    console.log("[Seeder] ----------------------------------------");
    console.log("[Seeder] Creating CityEventState ...");
    await CityEventState.bulkCreate(states, { validate: true });
    console.log("[Seeder] ✅ CityEventState successfully created");
    console.log("[Seeder] ----------------------------------------");
    console.log("[Seeder] Creating CityEventCategory ...");
    await CityEventCategory.bulkCreate(categories, { validate: true });
    console.log("[Seeder] ✅ CityEventCategory successfully created");
    console.log("[Seeder] ✅ Done seeding data");
  } catch (error) {
    console.log("[Seeder] ❌ Error seeding data : ", error);
  }
};

module.exports = seedData;
