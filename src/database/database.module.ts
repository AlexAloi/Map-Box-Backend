import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WeatherStation } from 'src/weather-station/weather-station.entity';
import { WeatherStationSeeder } from './seeders/weather-station.seeder';

@Module({
  imports: [TypeOrmModule.forFeature([WeatherStation])],
  providers: [WeatherStationSeeder],
  exports: [WeatherStationSeeder],
})
export class DatabaseModule {}
