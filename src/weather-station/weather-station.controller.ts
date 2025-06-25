import { Controller, Get } from '@nestjs/common';
import { WeatherStationService } from './weather-station.service';

@Controller('weather-station')
export class WeatherStationController {
  constructor(private readonly weatherStationsService: WeatherStationService) {}

  @Get()
  findAll() {
    return this.weatherStationsService.findAll();
  }
}
