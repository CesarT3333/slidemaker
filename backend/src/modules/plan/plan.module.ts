import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { PlanRepository } from '../../db/repository/plan.repository';
import { PlanService } from '../../services/plan.service';
import { PlanController } from './plan.controller';
import Plan from '../../db/models/plan';

@Module({
  imports: [
    TypeOrmModule.forFeature([Plan, PlanRepository])
  ],
  controllers: [PlanController],
  providers: [PlanService],
  exports: [PlanService]
})
export class PlanModule { }
