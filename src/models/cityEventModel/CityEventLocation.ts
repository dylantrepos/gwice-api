import { DataTypes } from "sequelize";
import { Column, HasMany, Model, Table } from "sequelize-typescript";
import { CityEvent } from "./CityEvent";

@Table({ tableName: "city_event_locations" })
export class CityEventLocation extends Model {
  @Column({
    type: DataTypes.STRING,
    allowNull: true,
  })
  adress!: string;

  @Column({
    type: DataTypes.STRING,
    allowNull: true,
  })
  city!: string;

  @Column({
    type: DataTypes.STRING,
    allowNull: true,
  })
  postal_code!: string;

  @HasMany(() => CityEvent)
  city_events!: CityEvent[];
}
