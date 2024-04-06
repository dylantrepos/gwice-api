const seedData = require("../seeder/seeder");

const startCron = () => {
  seedData();
};

startCron();
