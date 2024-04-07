const { DataTypes, Model } = require("sequelize");
const getConnexion = require("../../database/getConnexion");

class CityEventRegistration extends Model {}

CityEventRegistration.init(
  {
    link: {
      type: DataTypes.TEXT,
      allowNull: true,
      unicode: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      unicode: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
      unicode: true,
    },
  },
  {
    sequelize: getConnexion(),
    tableName: "city_event_registrations",
    modelName: "CityEventRegistration",
  }
);

module.exports = CityEventRegistration;
