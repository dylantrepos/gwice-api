const { Sequelize } = require("sequelize");

function getConnexion() {
  return new Sequelize(
    process.env.PGDATABASE,
    process.env.PGUSER,
    process.env.PGPASSWORD,
    {
      define: {
        createdAt: "created_at",
        updatedAt: "updated_at",
        underscored: true,
      },
      host: process.env.PGHOST,
      dialect: process.env.DB_ENV,
      logging: false,
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
    }
  );
}

module.exports = getConnexion;
