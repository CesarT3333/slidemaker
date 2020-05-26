import { Injectable } from '@nestjs/common';

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
