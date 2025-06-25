import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WeatherStationController } from './weather-station.controller';
import { WeatherStation } from './weather-station.entity';
import { WeatherStationService } from './weather-station.service';

@Module({
  imports: [TypeOrmModule.forFeature([WeatherStation])],
  controllers: [WeatherStationController],
  providers: [WeatherStationService],
  exports: [WeatherStationService],
})
export class WeatherStationModule {}
