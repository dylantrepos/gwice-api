import { CityEventCategory } from "../models/cityEventModel/CityEventCategory";
import { CityEventState } from "../models/cityEventModel/CityEventState";
import { CityEventStatus } from "../models/cityEventModel/CityEventStatus";
import { CATEGORIES, STATES, STATUS } from "./data/Constant";

const models: Record<any, any> = [
  { modelElt: CityEventStatus, data: STATUS },
  { modelElt: CityEventState, data: STATES },
  { modelElt: CityEventCategory, data: CATEGORIES },
];

export const seedData = async () => {
  console.log("\n[Seeder] ⌛ Start seeding data ...\n");
  try {
    for (const model of Object.values(models)) {
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
