import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Measurement } from 'src/measurement/measurement.entity';
import { Variable } from 'src/variable/variable.entity';
import { WeatherStation } from 'src/weather-station/weather-station.entity';
import { MeasurementSeeder } from './seeders/measurement.seeder';
import { VariableSeeder } from './seeders/variable.seeder';
import { WeatherStationSeeder } from './seeders/weather-station.seeder';

@Module({
  imports: [TypeOrmModule.forFeature([WeatherStation, Variable, Measurement])],
  providers: [WeatherStationSeeder, VariableSeeder, MeasurementSeeder],
  exports: [WeatherStationSeeder, VariableSeeder, MeasurementSeeder],
})
export class DatabaseModule {}
