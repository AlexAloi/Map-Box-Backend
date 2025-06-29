import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { getDatabaseConfig } from './database/database.config';
import { DatabaseModule } from './database/database.module';
import { MeasurementModule } from './measurement/measurement.module';
import { VariableModule } from './variable/variable.module';
import { WeatherStationModule } from './weather-station/weather-station.module';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: getDatabaseConfig,
      inject: [ConfigService],
    }),
    WeatherStationModule,
    VariableModule,
    MeasurementModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
