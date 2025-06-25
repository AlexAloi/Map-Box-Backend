import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Measurement } from './measurement.entity';

@Injectable()
export class MeasurementService {
  constructor(
    @InjectRepository(Measurement)
    private MeasurementsRepository: Repository<Measurement>,
  ) {}

  async findAll(): Promise<Measurement[]> {
    return this.MeasurementsRepository.find({
      order: { id: 'ASC' },
    });
  }
}
