const { DataTypes, Model } = require("sequelize");
const getConnexion = require("../getConnexion");

class CityEventTiming extends Model {}

CityEventTiming.init(
  {
    start_time: {
      type: DataTypes.STRING,
      allowNull: false,
      unicode: true,
    },
    end_time: {
      type: DataTypes.STRING,
      allowNull: false,
      unicode: true,
    },
  },
  {
    sequelize: getConnexion(),
    tableName: "city_event_timings",
    modelName: "CityEventTiming",
  }
);

module.exports = CityEventTiming;
