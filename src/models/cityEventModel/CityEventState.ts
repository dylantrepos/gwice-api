import { DataTypes } from "sequelize";
import { Column, HasMany, Model, Table } from "sequelize-typescript";
import { CityEvent } from "./CityEvent";

@Table({ tableName: "city_event_states" })
export class CityEventState extends Model {
  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
  state!: string;

  @Column({
    type: DataTypes.INTEGER,
    allowNull: false,
  })
  state_code!: number;

  @HasMany(() => CityEvent)
  city_events!: CityEvent[];
}
