import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { PlanService } from '@services/plan.service';
import { resources } from '../../util/resources';
import Plan from '@model/plan';
import User from '@model/user';

@UseGuards(AuthGuard('jwt'))
@Controller(resources.PLANS)
export class PlanController {

  constructor(
    private planService: PlanService
  ) { }

  @Get()
  getAll(@Req() request): Promise<Array<Plan>> {
    const user = <User>{ googleId: request.user.profileId };
    return this.planService.getAll(user);
  }

}
