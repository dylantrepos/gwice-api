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
      shortDescription: DataTypes.TEXT,
      longDescription: DataTypes.TEXT,
      price: DataTypes.STRING,
      imageUrl: DataTypes.STRING,
      registration: DataTypes.STRING,
      minimumAge: DataTypes.INTEGER,
      eventUrl: DataTypes.STRING,
      openAgendaUid: DataTypes.STRING,
      openAgendaCreatedAt: DataTypes.DATE,
      openAgendaUpdatedAt: DataTypes.DATE,
      openAgendaUserUid: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "CityEvent",
    }
  );
  return CityEvent;
};
