import { DataTypes } from "sequelize";
import { Column, HasMany, Model, Table } from "sequelize-typescript";
import { CityEvent } from "./CityEvent";

@Table({ tableName: "city_event_registrations" })
export class CityEventRegistration extends Model {
  @Column({
    type: DataTypes.TEXT,
    allowNull: true,
  })
  link: string | null = null;

  @Column({
    type: DataTypes.STRING,
    allowNull: true,
  })
  email: string | null = null;

  @Column({
    type: DataTypes.STRING,
    allowNull: true,
  })
  phone: string | null = null;

  @HasMany(() => CityEvent)
  city_events!: CityEvent[];
}
