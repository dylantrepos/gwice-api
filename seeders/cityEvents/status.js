// seed.js

const { Sequelize, DataTypes } = require("sequelize");

const { config } = require("dotenv");

config();

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
    },
  },
});

const Status = require("../../models/cityeventstatus")(sequelize, DataTypes);

const STATUS = [
  { status: "Published", statusCode: 2 },
  { status: "Ready to publish", statusCode: 1 },
  { status: "To moderate", statusCode: 0 },
  { status: "Rejected", statusCode: -1 },
];

const seedDatabase = async () => {
  STATUS.map(async (statusItem) => {
    const { status, statusCode } = statusItem;
    await Status.create({
      status,
      statusCode,
    });
  });
};

module.exports = seedDatabase;
