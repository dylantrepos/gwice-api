"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CityEvent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }
  CityEvent.init(
    {
      title: DataTypes.STRING,
      shortDescription: DataTypes.STRING,
      longDescription: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "CityEvent",
    }
  );
  return CityEvent;
};
