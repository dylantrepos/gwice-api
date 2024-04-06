const initTable = require("../database/createTable");
const seedData = require("../seeder/seeder");

const startCron = async () => {
  console.log("[Cron] ⌛ Start cron ...\n");
  await initTable();
  await seedData();
  console.log("[Cron] ✅ Cron successfully completed !\n");
};

startCron();
