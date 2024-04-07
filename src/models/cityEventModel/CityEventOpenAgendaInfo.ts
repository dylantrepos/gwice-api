import { DataTypes } from "sequelize";
import { Column, Model, Table } from "sequelize-typescript";

@Table({ tableName: "city_event_open_agenda_infos" })
export class CityEventOpenAgendaInfo extends Model {
  @Column({
    type: DataTypes.STRING,
    allowNull: true,
  })
  event_uid!: string;

  @Column({
    type: DataTypes.STRING,
    allowNull: true,
  })
  creator_uid!: string;

  @Column({
    type: DataTypes.DATE,
    allowNull: true,
  })
  open_agenda_created_at!: Date;

  @Column({
    type: DataTypes.DATE,
    allowNull: true,
  })
  open_agenda_updated_at!: Date;
}
