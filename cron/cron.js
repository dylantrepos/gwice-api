const initTable = require("../database/createTable");
const initOpenAgendaCityEvents = require("../seeder/data/OpenAgenda");
const seedData = require("../seeder/seeder");

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
