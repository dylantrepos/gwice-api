"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CityEventCategory extends Model {
    static associate(models) {
      CityEventCategory.belongsToMany(models.CityEvent, {
        foreignKey: "cityEventCategoryId",
        as: "CityEventCategory",
        onDelete: "CASCADE",
      });
    }
  }
  CityEventCategory.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "CityEventCategory",
    }
  );
  return CityEventCategory;
};
