const { DataTypes, Model } = require("sequelize");
const getConnexion = require("../../database/getConnexion");

class CityEventOpenAgendaInfo extends Model {}

CityEventOpenAgendaInfo.init(
  {
    event_uid: {
      type: DataTypes.STRING,
      allowNull: true,
      unicode: true,
    },
    creator_uid: {
      type: DataTypes.STRING,
      allowNull: true,
      unicode: true,
    },
    open_agenda_created_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    open_agenda_updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize: getConnexion(),
    tableName: "city_event_open_agenda_infos",
    modelName: "CityEventOpenAgendaInfo",
  }
);

module.exports = CityEventOpenAgendaInfo;
