"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CityEventTimings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      CityEventTimings.belongsTo(models.CityEvent, {
        foreignKey: "cityEventId",
        onDelete: "CASCADE",
      });
    }
  }
  CityEventTimings.init(
    {
      startTime: DataTypes.STRING,
      endTime: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "CityEventTimings",
    }
  );
  return CityEventTimings;
};
