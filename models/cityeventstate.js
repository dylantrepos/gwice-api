"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CityEventState extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      CityEventState.belongsToMany(models.CityEvent, {
        foreignKey: "cityEventId",
        onDelete: "CASCADE",
      });
    }
  }
  CityEventState.init(
    {
      state: DataTypes.STRING,
      stateCode: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "CityEventState",
    }
  );
  return CityEventState;
};
