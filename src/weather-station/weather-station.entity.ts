import { Column, Entity, PrimaryColumn } from 'typeorm';

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

  @Column({ name: 'ws_name', length: 255 })
  wsName: string;

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
}
