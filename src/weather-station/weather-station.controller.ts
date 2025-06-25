import { Controller, Get } from '@nestjs/common';
import { WeatherStationsService } from './weather-station.service';

@Controller('weather-stations')
export class WeatherStationsController {
  constructor(
    private readonly weatherStationsService: WeatherStationsService,
  ) {}

  @Get()
  findAll() {
    return this.weatherStationsService.findAll();
  }
}
