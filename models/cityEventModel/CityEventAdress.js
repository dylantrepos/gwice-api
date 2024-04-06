const { DataTypes, Model } = require("sequelize");
const getConnexion = require("../../database/getConnexion");

class CityEventAdress extends Model {}

CityEventAdress.init(
  {
    adress: {
      type: DataTypes.STRING,
      allowNull: false,
      unicode: true,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      unicode: true,
    },
    postalCode: {
      type: DataTypes.STRING,
      allowNull: false,
      unicode: true,
    },
  },
  {
    sequelize: getConnexion(),
    tableName: "city_event_adresses",
    modelName: "CityEventAdress",
  }
);

module.exports = CityEventAdress;
