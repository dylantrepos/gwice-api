const { DataTypes, Model } = require("sequelize");
const getConnexion = require("../../database/getConnexion");

class CityEventState extends Model {}

CityEventState.init(
  {
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      unicode: true,
    },
    state_code: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unicode: true,
    },
  },
  {
    sequelize: getConnexion(),
    tableName: "city_event_states",
    modelName: "CityEventState",
  }
);

module.exports = CityEventState;
