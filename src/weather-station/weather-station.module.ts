import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WeatherStationsController } from './weather-station.controller';
import { WeatherStation } from './weather-station.entity';
import { WeatherStationsService } from './weather-station.service';

@Module({
  imports: [TypeOrmModule.forFeature([WeatherStation])],
  controllers: [WeatherStationsController],
  providers: [WeatherStationsService],
  exports: [WeatherStationsService],
})
export class WeatherStationsModule {}
