const { Model, DataTypes } = require("sequelize");
const getConnexion = require("../../database/getConnexion");
const CityEvent = require("./CityEvent");
const CityEventTiming = require("./CityEventTiming");

class CityEventCityEventTiming extends Model {}

CityEventCityEventTiming.init(
  {
    city_event_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: { model: CityEvent },
    },
    city_event_timing_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: { model: CityEventTiming },
    },
  },
  {
    sequelize: getConnexion(), // We need to pass the connection instance
    modelName: "CityEventCityEventTiming", // We need to choose the model name
    tableName: "city_event_city_event_timing",
  }
);

module.exports = CityEventCityEventTiming;
