const { DataTypes, Model } = require("sequelize");
const getConnexion = require("../../database/getConnexion");
const CityEventStatus = require("./CityEventStatus");
const CityEventState = require("./CityEventState");
const CityEventAdress = require("./CityEventAdress");
const CityEventRegistration = require("./CityEventRegistration");
const CityEventOpenAgendaInfo = require("./CityEventOpenAgendaInfo");

class CityEvent extends Model {}

CityEvent.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    short_description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    long_description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    price: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    minimum_age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    event_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    city_event_open_agenda_info_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: CityEventOpenAgendaInfo },
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
    city_event_registration_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: CityEventRegistration },
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
