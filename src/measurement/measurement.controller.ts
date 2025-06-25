import { Controller, Get } from '@nestjs/common';
import { MeasurementService } from './measurement.service';

@Controller('measurement')
export class MeasurementController {
  constructor(private readonly MeasurementsService: MeasurementService) {}

  @Get()
  findAll() {
    return this.MeasurementsService.findAll();
  }
}
