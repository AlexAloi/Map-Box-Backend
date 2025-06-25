// src/database/seeders/variable.seeder.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as csv from 'csv-parser';
import * as fs from 'fs';
import * as path from 'path';
import { Variable } from 'src/variable/variable.entity';
import { Repository } from 'typeorm';

@Injectable()
export class VariableSeeder {
  constructor(
    @InjectRepository(Variable)
    private variableRepository: Repository<Variable>,
  ) {}

  async seedFromCsv(): Promise<void> {
    // Create table if it doesn't exist
    await this.variableRepository.query(`
      CREATE TABLE IF NOT EXISTS variables (
        id INT PRIMARY KEY,
        weather_station_id INT NOT NULL,
        name VARCHAR(100) NOT NULL,
        unit VARCHAR(50) NOT NULL,
        long_name VARCHAR(255) NOT NULL,
        FOREIGN KEY (weather_station_id) REFERENCES weather_station(id) ON DELETE CASCADE
      )
    `);

    const csvPath = path.join(
      process.cwd(),
      'src/database/seeds/variables.csv',
    );
    const variables: Variable[] = [];

    return new Promise((resolve, reject) => {
      fs.createReadStream(csvPath)
        .pipe(csv())
        .on('data', (row) => {
          variables.push({
            id: parseInt(row.id),
            weatherStationId: parseInt(row.weather_station_id),
            name: row.name,
            unit: row.unit,
            longName: row.long_name,
          } as Variable);
        })
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        .on('end', async () => {
          await this.variableRepository.upsert(variables, ['id']);
          console.log(`Seeded ${variables.length} variables`);
          resolve();
        })
        .on('error', reject);
    });
  }
}
