"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CityEventAdress extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      CityEventAdress.belongsToMany(models.CityEvent, {
        foreignKey: "cityEventId",
        onDelete: "CASCADE",
      });
    }
  }
  CityEventAdress.init(
    {
      adress: DataTypes.STRING,
      city: DataTypes.STRING,
      postCode: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "CityEventAdress",
    }
  );
  return CityEventAdress;
};
