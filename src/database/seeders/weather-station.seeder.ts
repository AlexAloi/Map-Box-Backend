import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as csv from 'csv-parser';
import * as fs from 'fs';
import * as path from 'path';
import { Repository } from 'typeorm';
import {
  State,
  WeatherStation,
} from '../../weather-station/weather-station.entity';

@Injectable()
export class WeatherStationSeeder {
  constructor(
    @InjectRepository(WeatherStation)
    private weatherStationRepository: Repository<WeatherStation>,
  ) {}

  async seedFromCsv(): Promise<void> {
    await this.weatherStationRepository.query(`
      CREATE TABLE IF NOT EXISTS weather_station (
        id INT PRIMARY KEY,
        weather_station_name VARCHAR(255) NOT NULL,
        site VARCHAR(255) NOT NULL,
        portfolio VARCHAR(255) NOT NULL,
        state ENUM('NSW','VIC','QLD','SA','WA','TAS','NT','ACT') NOT NULL,
        latitude DECIMAL(10,6) NOT NULL,
        longitude DECIMAL(10,6) NOT NULL
      )
    `);

    const csvPath = path.join(
      process.cwd(),
      'src/database/seeds/weather_stations.csv',
    );
    const weatherStations: WeatherStation[] = [];

    return new Promise((resolve, reject) => {
      fs.createReadStream(csvPath)
        .pipe(csv())
        .on('data', (row) => {
          weatherStations.push({
            id: parseInt(row.id),
            weatherStationName: row.weather_station_name,
            site: row.site,
            portfolio: row.portfolio,
            state: row.state as State,
            latitude: parseFloat(row.latitude),
            longitude: parseFloat(row.longitude),
          } as WeatherStation);
        })
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        .on('end', async () => {
          await this.weatherStationRepository.upsert(weatherStations, ['id']);
          console.log(`Seeded ${weatherStations.length} weather stations`);
          resolve();
        })
        .on('error', reject);
    });
  }
}
