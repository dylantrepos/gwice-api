import { DataTypes } from "sequelize";
import { Column, HasMany, Model, Table } from "sequelize-typescript";
import { CityEvent } from "./CityEvent";

@Table({ tableName: "city_event_status" })
export class CityEventStatus extends Model {
  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
  status!: string;

  @Column({
    type: DataTypes.INTEGER,
    allowNull: false,
  })
  status_code!: number;

  @HasMany(() => CityEvent)
  city_events!: CityEvent[];
}
