const { Model, DataTypes, Deferrable, literal } = require("sequelize");
const getConnexion = require("../../database/getConnexion");
const CityEvent = require("./CityEvent");
const CityEventCategory = require("./CityEventCategory");

class CityEventCityEventCategory extends Model {}

CityEventCityEventCategory.init(
  {
    city_event_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: { model: CityEvent },
    },
    city_event_category_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: { model: CityEventCategory },
    },
  },
  {
    sequelize: getConnexion(), // We need to pass the connection instance
    modelName: "CityEventCityEventCategory", // We need to choose the model name
    tableName: "city_event_city_event_category",
  }
);

module.exports = CityEventCityEventCategory;
