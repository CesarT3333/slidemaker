import { Injectable } from '@nestjs/common';

import { SubscriptionStatusEnum } from '@model/enum/subscription-status.enum';
import { PlanRepository } from '@repository/plan.repository';
import { SubscriptionService } from './subscription.service';
import { Subscription } from '@model/subscription';
import Plan from '@model/plan';
import User from '@model/user';

@Injectable()
export class PlanService {

  constructor(
    private subscriptionService: SubscriptionService,
    private planRepository: PlanRepository,
  ) { }

  async getAll(user: User): Promise<Array<Plan>> {
    const userSubscription: Subscription =
      await this.subscriptionService.getForLoggedInUser(user);

    const plans: Array<Plan> = await this.planRepository.find();

    return plans.filter(p => {
      if ((userSubscription?.status === SubscriptionStatusEnum.REPPROVED && p.id === 4) ||
        userSubscription?.plan?.id === 4 && p.id === 4
      ) {
        return false;
      }

      return true;

    });
  }

  async getById(id: number): Promise<Plan> {
    return await this.planRepository.findOne(id);
  }

}
