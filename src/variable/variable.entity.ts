import { Measurement } from 'src/measurement/measurement.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { WeatherStation } from '../weather-station/weather-station.entity';

@Entity('variable')
export class Variable {
  @PrimaryColumn()
  id: number;

  @Column({ name: 'weather_station_id' })
  weatherStationId: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 50 })
  unit: string;

  @Column({ name: 'long_name', length: 255 })
  longName: string;

  @OneToMany(() => Measurement, (measurement) => measurement.variable)
  measurements: Measurement[];
  @ManyToOne(() => WeatherStation, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'weather_station_id' })
  weatherStation: WeatherStation;
}
