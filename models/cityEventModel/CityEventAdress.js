const { DataTypes, Model } = require("sequelize");
const getConnexion = require("../../database/getConnexion");

class CityEventAdress extends Model {}

CityEventAdress.init(
  {
    adress: {
      type: DataTypes.STRING,
      allowNull: true,
      unicode: true,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true,
      unicode: true,
    },
    postal_code: {
      type: DataTypes.STRING,
      allowNull: true,
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
