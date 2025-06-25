import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MeasurementSeeder } from './database/seeders/measurement.seeder';
import { VariableSeeder } from './database/seeders/variable.seeder';
import { WeatherStationSeeder } from './database/seeders/weather-station.seeder';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const weatherStationSeeder = app.get(WeatherStationSeeder);
  await weatherStationSeeder.seedFromCsv();

  const variableSeeder = app.get(VariableSeeder);
  await variableSeeder.seedFromCsv();

  const measurementSeeder = app.get(MeasurementSeeder);
  await measurementSeeder.seedFromCsvFolder();

  await app.listen(3000);
}
bootstrap();
