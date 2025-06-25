import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Variable } from './variable.entity';

@Injectable()
export class VariableService {
  constructor(
    @InjectRepository(Variable)
    private VariablesRepository: Repository<Variable>,
  ) {}

  async findAll(): Promise<Variable[]> {
    return this.VariablesRepository.find({
      order: { id: 'ASC' },
    });
  }
}
