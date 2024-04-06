const { DataTypes, Model } = require("sequelize");
const getConnexion = require("../../database/getConnexion");

class CityEventStatus extends Model {}

CityEventStatus.init(
  {
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      unicode: true,
    },
    status_code: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unicode: true,
    },
  },
  {
    sequelize: getConnexion(),
    tableName: "city_event_status",
    modelName: "CityEventStatus",
  }
);

module.exports = CityEventStatus;
