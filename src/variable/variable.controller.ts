import { Controller, Get } from '@nestjs/common';
import { VariableService } from './variable.service';

@Controller('variable')
export class VariableController {
  constructor(private readonly VariablesService: VariableService) {}

  @Get()
  findAll() {
    return this.VariablesService.findAll();
  }
}
