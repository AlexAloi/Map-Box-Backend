import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VariableController } from './variable.controller';
import { Variable } from './variable.entity';
import { VariableService } from './variable.service';

@Module({
  imports: [TypeOrmModule.forFeature([Variable])],
  controllers: [VariableController],
  providers: [VariableService],
  exports: [VariableService],
})
export class VariableModule {}
