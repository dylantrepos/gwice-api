import { DataTypes } from "sequelize";
import { BelongsToMany, Column, Model, Table } from "sequelize-typescript";
import { CityEvent } from "./CityEvent";
import { CityEventCityEventTiming } from "./CityEventCityEventTiming";

@Table({ tableName: "city_event_timings" })
export class CityEventTiming extends Model {
  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
  start_time!: string;

  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
  end_time!: string;

  @BelongsToMany(() => CityEvent, () => CityEventCityEventTiming)
  city_event!: CityEvent[];
}
