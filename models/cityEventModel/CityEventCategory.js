const { DataTypes, Model } = require("sequelize");
const getConnexion = require("../../database/getConnexion");

class CityEventCategory extends Model {}

CityEventCategory.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unicode: true,
    },
    open_agenda_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unicode: true,
    },
  },
  {
    sequelize: getConnexion(),
    tableName: "city_event_categories",
    modelName: "CityEventCategory",
  }
);

module.exports = CityEventCategory;