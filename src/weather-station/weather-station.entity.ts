import { Variable } from 'src/variable/variable.entity';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

export enum State {
  NSW = 'NSW',
  VIC = 'VIC',
  QLD = 'QLD',
  SA = 'SA',
  WA = 'WA',
  TAS = 'TAS',
  NT = 'NT',
  ACT = 'ACT',
}

@Entity('weather_station')
export class WeatherStation {
  @PrimaryColumn()
  id: number;

  @Column({ name: 'weather_station_name', length: 255 })
  weatherStationName: string;

  @Column({ length: 255 })
  site: string;

  @Column({ length: 255 })
  portfolio: string;

  @Column({
    type: 'enum',
    enum: State,
  })
  state: State;

  @Column({ type: 'decimal', precision: 10, scale: 6 })
  latitude: number;

  @Column({ type: 'decimal', precision: 10, scale: 6 })
  longitude: number;

  @OneToMany(() => Variable, (variable) => variable.weatherStation)
  variables: Variable[];
}
