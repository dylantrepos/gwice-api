import { DataTypes } from "sequelize";
import {
  BelongsTo,
  BelongsToMany,
  Column,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { CityEventCategory } from "./CityEventCategory";
import { CityEventCityEventCategory } from "./CityEventCityEventCategory";
import { CityEventCityEventTiming } from "./CityEventCityEventTiming";
import { CityEventLocation } from "./CityEventLocation";
import { CityEventOpenAgendaInfo } from "./CityEventOpenAgendaInfo";
import { CityEventRegistration } from "./CityEventRegistration";
import { CityEventState } from "./CityEventState";
import { CityEventStatus } from "./CityEventStatus";
import { CityEventTiming } from "./CityEventTiming";

@Table({ tableName: "city_events" }) // Replace with your actual table name
export class CityEvent extends Model {
  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
  title!: string;

  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
  short_description!: string;

  @Column({
    type: DataTypes.TEXT,
    allowNull: false,
  })
  long_description!: string;

  @Column({
    type: DataTypes.STRING,
    allowNull: true,
  })
  price!: string;

  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
  image_url!: string;

  @Column({
    type: DataTypes.INTEGER,
    allowNull: false,
  })
  minimum_age!: number;

  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
  next_timing_start_date!: string;

  /**
   * Foreign keys
   *
   * Many-to-many relationships
   */

  @BelongsToMany(() => CityEventCategory, () => CityEventCityEventCategory)
  city_event_category!: CityEventCategory[];

  @BelongsToMany(() => CityEventTiming, () => CityEventCityEventTiming)
  city_event_timing!: CityEventTiming[];

  /**
   * Foreign keys
   *
   * One-to-many relationships
   */
  // CityEventStatus
  @ForeignKey(() => CityEventStatus)
  @Column({
    type: DataTypes.INTEGER,
    allowNull: false,
  })
  city_event_status_id!: number;

  @BelongsTo(() => CityEventStatus)
  cityEventStatus!: CityEventStatus;

  // CityEventState
  @ForeignKey(() => CityEventState)
  @Column({
    type: DataTypes.INTEGER,
    allowNull: false,
  })
  city_event_state_id!: number;

  @BelongsTo(() => CityEventState)
  cityEventState!: CityEventState;

  // CityEventLocation
  @ForeignKey(() => CityEventLocation)
  @Column({
    type: DataTypes.INTEGER,
    allowNull: false,
  })
  city_event_location_id!: number;

  @BelongsTo(() => CityEventLocation)
  cityEventLocation!: CityEventLocation;

  // CityEventRegistration
  @ForeignKey(() => CityEventRegistration)
  @Column({
    type: DataTypes.INTEGER,
    allowNull: false,
  })
  city_event_registration_id!: number;

  @BelongsTo(() => CityEventRegistration)
  cityEventRegistration!: CityEventRegistration;

  // CityEventOpenAgendaInfo
  @ForeignKey(() => CityEventOpenAgendaInfo)
  @Column({
    type: DataTypes.INTEGER,
    allowNull: false,
  })
  city_event_open_agenda_info_id!: number;

  @BelongsTo(() => CityEventOpenAgendaInfo)
  cityEventOpenAgendaInfo!: CityEventOpenAgendaInfo;
}
