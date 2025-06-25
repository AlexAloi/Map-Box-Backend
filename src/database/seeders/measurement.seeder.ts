import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as csv from 'csv-parser';
import * as fs from 'fs';
import * as path from 'path';
import { Measurement } from 'src/measurement/measurement.entity';
import { Variable } from 'src/variable/variable.entity';
import { WeatherStation } from 'src/weather-station/weather-station.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MeasurementSeeder {
  constructor(
    @InjectRepository(Measurement)
    private measurementRepository: Repository<Measurement>,
    @InjectRepository(Variable)
    private variableRepository: Repository<Variable>,
    @InjectRepository(WeatherStation)
    private stationRepository: Repository<WeatherStation>,
  ) {}

  async seedFromCsvFolder(): Promise<void> {
    await this.measurementRepository.query('drop table measurement');
    await this.measurementRepository.query(`
      CREATE TABLE IF NOT EXISTS measurement (
        id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        weather_station_id INT NOT NULL,
        variable_name VARCHAR(255) NOT NULL,
        timestamp DATETIME NOT NULL,
        value DECIMAL(10,4) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_weather_station FOREIGN KEY (weather_station_id) REFERENCES weather_station(id) ON DELETE CASCADE
    )
    `);
    const folderPath = path.join(
      process.cwd(),
      'src/database/seeds/measurements',
    );
    const files = fs
      .readdirSync(folderPath)
      .filter((f) => f.startsWith('data_') && f.endsWith('.csv'));
    for (const file of files) {
      const stationIdMatch = file.match(/data_(\d+)\.csv/);
      if (!stationIdMatch) continue;
      const stationId = parseInt(stationIdMatch[1]);

      const weatherStation = await this.stationRepository.findOneBy({
        id: stationId,
      });
      if (!weatherStation) {
        console.warn(`No weather station found for ID ${stationId}`);
        continue;
      }

      const variableCache: Record<string, Variable> = {};
      const measurements: Measurement[] = [];

      const filePath = path.join(folderPath, file);
      const pendingInserts: Promise<void>[] = [];

      await new Promise<void>((resolve, reject) => {
        fs.createReadStream(filePath)
          .pipe(csv())

          .on('data', (row) => {
            const timestampStr = row['timestamp'];
            const timestamp = parseDate(timestampStr);

            for (const key of Object.keys(row)) {
              if (key === 'timestamp') continue;

              const value = parseFloat(row[key]);
              if (isNaN(value)) continue;

              const insertPromise = (async () => {
                let variable: Variable | null = variableCache[key];
                if (!variable) {
                  variable = await this.variableRepository
                    .createQueryBuilder('variable')
                    .where('LOWER(variable.name) = LOWER(:name)', { name: key })
                    .getOne();
                  if (!variable) {
                    console.warn(`Variable ${key} not found in DB`);
                    return;
                  }
                  variableCache[key] = variable;
                }

                measurements.push(
                  this.measurementRepository.create({
                    weatherStation,
                    variableName: variable,
                    timestamp,
                    value,
                  }),
                );
              })();

              pendingInserts.push(insertPromise);
            }
          })
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          .on('end', async () => {
            await Promise.all(pendingInserts);
            await this.measurementRepository.upsert(measurements, [
              'weatherStation',
              'variableName',
              'timestamp',
            ]);
            console.log(
              `Seeded ${measurements.length} measurements from ${file}`,
            );
            resolve();
          })
          .on('error', reject);
      });
    }
  }
}

function parseDate(dateStr: string): Date {
  const [datePart, timePart] = dateStr.split(' ');
  const [day, month, year] = datePart.split('/').map(Number);
  const [hours, minutes, seconds] = timePart.split(':').map(Number);

  return new Date(year, month - 1, day, hours, minutes, seconds || 0);
}
