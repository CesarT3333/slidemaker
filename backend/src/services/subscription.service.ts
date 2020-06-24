import { Injectable } from '@nestjs/common';

import { SubscriptionStatusEnum } from '@model/enum/subscription-status.enum';
import { SubscriptionRepository } from '@repository/subscription.repository';
import { Subscription } from '@model/subscription';
import { UserService } from './user.service';
import User from '@model/user';

@Injectable()
export class SubscriptionService {

  constructor(
    private subscriptionRepository: SubscriptionRepository,
    private userService: UserService
  ) { }

  async getForLoggedInUser(user: User): Promise<Subscription> {
    return this.subscriptionRepository.getForLoggedInUser(user);
  }

  async getForLoggedInUserWithStatus(user: User): Promise<Subscription> {
    return this.subscriptionRepository.getForLoggedInUserWithStatus(user);
  }

  async create(subscription: Subscription): Promise<any> {

    if (subscription.plan.id === 4) {
      subscription.amountPresentation = 3;
      subscription.status = SubscriptionStatusEnum.APPROVED;
    }

    const idUser: number = await this.userService
      .getIdByGoogleId(subscription.user.googleId);

    subscription.user.id = idUser;

    return this.subscriptionRepository.save(subscription);
  }

  async save(subscription: Subscription): Promise<any> {
    return this.subscriptionRepository.save(subscription);
  }

  async updateWithStatus(subscription: Subscription) {
    return await this.subscriptionRepository.save(subscription);
  }

}
