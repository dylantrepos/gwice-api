import { DataTypes } from "sequelize";
import { Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { CityEvent } from "./CityEvent";
import { CityEventTiming } from "./CityEventTiming";

@Table({ tableName: "city_event_city_event_timing" })
export class CityEventCityEventTiming extends Model {
  @ForeignKey(() => CityEvent)
  @Column({
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  })
  city_event_id!: number;

  @ForeignKey(() => CityEventTiming)
  @Column({
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  })
  city_event_timing_id!: number;
}
