import { DataTypes } from "sequelize";
import { Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { CityEvent } from "./CityEvent";
import { CityEventCategory } from "./CityEventCategory";

@Table({ tableName: "city_event_city_event_category" })
export class CityEventCityEventCategory extends Model {
  @ForeignKey(() => CityEvent)
  @Column({
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  })
  city_event_id!: number;

  @ForeignKey(() => CityEventCategory)
  @Column({
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  })
  city_event_category_id!: number;
}
