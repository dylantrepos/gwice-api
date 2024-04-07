import { DataTypes } from "sequelize";
import { BelongsToMany, Column, Model, Table } from "sequelize-typescript";
import { CityEvent } from "./CityEvent";
import { CityEventCityEventCategory } from "./CityEventCityEventCategory";

@Table({ tableName: "city_event_categories" })
export class CityEventCategory extends Model {
  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
  title!: string;

  @Column({
    type: DataTypes.INTEGER,
    allowNull: false,
  })
  open_agenda_id!: number;

  @BelongsToMany(() => CityEvent, () => CityEventCityEventCategory)
  city_event!: CityEvent[];
}
