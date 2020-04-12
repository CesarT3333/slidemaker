import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { PlanController } from './plan.controller';
import Plan from '../../db/models/plan';
import { PlanService } from 'src/services/plan.service';
import { PlanRepository } from 'src/repository/plan.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([Plan, PlanRepository])
    ],
    controllers: [PlanController],
    providers: [PlanService],
    exports: [PlanService]
})
export class PlanModule { }
