import { Variable } from 'src/variable/variable.entity';
import { WeatherStation } from 'src/weather-station/weather-station.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity('measurement')
@Unique('unique_measurement', ['weatherStation', 'variableName', 'timestamp'])
export class Measurement {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @ManyToOne(() => WeatherStation, (station) => station.measurements, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'weather_station_id',
    referencedColumnName: 'id',
  })
  @Index('idx_station_time')
  weatherStation: WeatherStation;

  @ManyToOne(() => Variable, (variable) => variable.measurements, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'variable_name', referencedColumnName: 'name' })
  @Index('idx_variable_time')
  variableName: Variable;

  @Column({ type: 'datetime' })
  @Index('idx_station_time')
  @Index('idx_variable_time')
  timestamp: Date;

  @Column({ type: 'decimal', precision: 10, scale: 4 })
  value: number;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;
}
