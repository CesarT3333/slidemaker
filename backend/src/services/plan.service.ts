import { Injectable } from '@nestjs/common';

import { PlanRepository } from '../repository/plan.repository';
import Plan from '../db/models/plan';

@Injectable()
export class PlanService {

    constructor(
        private planRepository: PlanRepository
    ) { }

    getAll(): Promise<Array<Plan>> {
        return this.planRepository.find();
    }

}
