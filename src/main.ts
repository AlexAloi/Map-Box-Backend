import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WeatherStationSeeder } from './database/seeders/weather-station.seeder';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const seeder = app.get(WeatherStationSeeder);
  await seeder.seedFromCsv();
  await app.listen(3000);
}
bootstrap();
