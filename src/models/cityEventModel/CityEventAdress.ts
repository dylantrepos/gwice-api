import { DataTypes } from "sequelize";
import { Column, HasMany, Model, Table } from "sequelize-typescript";
import { CityEvent } from "./CityEvent";

@Table({ tableName: "city_event_adresses" })
export class CityEventAdress extends Model {
  @Column({
    type: DataTypes.STRING,
    allowNull: true,
  })
  adress: string | null = null;

  @Column({
    type: DataTypes.STRING,
    allowNull: true,
  })
  city: string | null = null;

  @Column({
    type: DataTypes.STRING,
    allowNull: true,
  })
  postal_code: string | null = null;

  @HasMany(() => CityEvent)
  city_events!: CityEvent[];
}
