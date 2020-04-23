import { Injectable } from '@nestjs/common';

import { PlanRepository } from '@repository/plan.repository';
import Plan from '@model/plan';

@Injectable()
export class PlanService {

  constructor(
    private planRepository: PlanRepository
  ) { }

  getAll(): Promise<Array<Plan>> {
    return this.planRepository.find();
  }

}
