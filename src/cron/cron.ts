import { initTable } from "../database/createTable";
import { initOpenAgendaCityEvents } from "../seeder/data/OpenAgenda";
import { seedData } from "../seeder/seeder";

const startCron = async () => {
  console.log("[Cron] ⌛ Start cron ...\n");
  try {
    await initTable();
    await seedData();
    await initOpenAgendaCityEvents();
    console.log("[Cron] ✅ Cron successfully completed !\n");
  } catch (error) {
    console.log("[Cron] ❌ Error in cron : ", error);
  }
};

startCron();
