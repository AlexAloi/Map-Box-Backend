import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Variable } from 'src/variable/variable.entity';
import { WeatherStation } from 'src/weather-station/weather-station.entity';
import { VariableSeeder } from './seeders/variable.seeder';
import { WeatherStationSeeder } from './seeders/weather-station.seeder';

@Module({
  imports: [TypeOrmModule.forFeature([WeatherStation, Variable])],
  providers: [WeatherStationSeeder, VariableSeeder],
  exports: [WeatherStationSeeder, VariableSeeder],
})
export class DatabaseModule {}
