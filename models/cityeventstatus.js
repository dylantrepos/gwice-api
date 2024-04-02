"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CityEventStatus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      CityEventStatus.belongsToMany(models.CityEvent, {
        foreignKey: "cityEventId",
        onDelete: "CASCADE",
      });
    }
  }
  CityEventStatus.init(
    {
      status: DataTypes.STRING,
      statusCode: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "CityEventStatus",
    }
  );
  return CityEventStatus;
};
