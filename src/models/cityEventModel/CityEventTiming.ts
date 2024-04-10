import { DataTypes } from "sequelize";
import { BelongsToMany, Column, Model, Table } from "sequelize-typescript";
import { CityEvent } from "./CityEvent";
import { CityEventCityEventTiming } from "./CityEventCityEventTiming";

@Table({ tableName: "city_event_timings" })
export class CityEventTiming extends Model {
  @Column({
    type: DataTypes.DATE,
    allowNull: false,
  })
  start_time!: Date;

  @Column({
    type: DataTypes.DATE,
    allowNull: false,
  })
  end_time!: Date;

  @BelongsToMany(() => CityEvent, () => CityEventCityEventTiming)
  city_event!: CityEvent[];
}
