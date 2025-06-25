import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WeatherStation } from './weather-station.entity';

@Injectable()
export class WeatherStationService {
  constructor(
    @InjectRepository(WeatherStation)
    private weatherStationsRepository: Repository<WeatherStation>,
  ) {}

  async findAll(): Promise<WeatherStation[]> {
    return this.weatherStationsRepository.find({
      order: { id: 'ASC' },
    });
  }
}
