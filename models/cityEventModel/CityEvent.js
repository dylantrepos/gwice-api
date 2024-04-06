const { DataTypes, Model } = require("sequelize");
const getConnexion = require("../../database/getConnexion");
const CityEventStatus = require("./CityEventStatus");
const CityEventState = require("./CityEventState");
const CityEventAdress = require("./CityEventAdress");

class CityEvent extends Model {}

CityEvent.init(
  {
    open_agenda_uid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    short_description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    long_description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    registration: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    minimum_age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    event_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    open_agenda_created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    open_agenda_updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    open_agenda_user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    city_event_status_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: CityEventStatus },
    },
    city_event_state_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: CityEventState },
    },
    city_event_adress_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: CityEventAdress },
    },
    // user_id: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   references: { model: User },
    // },
  },
  {
    sequelize: getConnexion(),
    tableName: "city_events",
    modelName: "CityEvent",
  }
);

module.exports = CityEvent;
