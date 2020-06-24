import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

import { PlanRepository } from '@repository/plan.repository';
import { PlanService } from '@services/plan.service';
import { PlanController } from './plan.controller';
import Plan from '@model/plan';
import { SubscriptionModule } from '../subscription/subscription.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Plan, PlanRepository]),
    ConfigModule,
    SubscriptionModule
  ],
  controllers: [PlanController],
  providers: [PlanService],
  exports: [PlanService]
})
export class PlanModule { }
