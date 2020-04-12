import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { PlanService } from '../../services/plan.service';
import { resources } from '../../util/resources';
import Plan from '../../db/models/plan';

@Controller(resources.PLANS)
export class PlanController {

    constructor(
        private planService: PlanService
    ) { }

    @Get()
    @UseGuards(AuthGuard('jwt'))
    getAll(): Promise<Array<Plan>> {
        return this.planService.getAll();
    }

}