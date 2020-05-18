import { Injectable } from '@nestjs/common';

import { PlanRepository } from '@repository/plan.repository';
import Plan from '@model/plan';

@Injectable()
export class PlanService {

  constructor(
    private planRepository: PlanRepository
  ) { }

  async getAll(): Promise<Array<Plan>> {
    return this.planRepository.find();
  }

  async getById(id: number): Promise<Plan> {
    return await this.planRepository.findOne(id);
  }

}
