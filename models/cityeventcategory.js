"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CityEventCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
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
