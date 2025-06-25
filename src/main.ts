import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // const weatherStationSeeder = app.get(WeatherStationSeeder);
  // await weatherStationSeeder.seedFromCsv();

  // const variableSeeder = app.get(VariableSeeder);
  // await variableSeeder.seedFromCsv();

  // const measurementSeeder = app.get(MeasurementSeeder);
  // await measurementSeeder.seedFromCsvFolder();

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('API Docs')
    .setDescription('NestJS API routes')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3001);
}
bootstrap();
