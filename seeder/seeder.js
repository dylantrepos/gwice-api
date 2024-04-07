const { STATUS, STATES, CATEGORIES } = require("./data/Constant");
const {
  CityEventState,
  CityEventStatus,
  CityEventCategory,
} = require("../models/cityEventModel");

const models = [
  { modelElt: CityEventStatus, data: STATUS },
  { modelElt: CityEventState, data: STATES },
  { modelElt: CityEventCategory, data: CATEGORIES },
];

const seedData = async () => {
  console.log("\n[Seeder] ⌛ Start seeding data ...\n");
  try {
    for (const model of models) {
      console.log(`[Seeder] ⌛ Seeding table ${model.modelElt.tableName} ...`);
      await model.modelElt.bulkCreate(model.data, { validate: true });
      console.log(
        `[Seeder] ✅ Table ${model.modelElt.tableName} successfully seeded`
      );
    }
    console.log("\n[Seeder] ✅ Done seeding data\n");
  } catch (error) {
    console.log("[Seeder] ❌ Error seeding data : ", error);
  }
};

module.exports = seedData;