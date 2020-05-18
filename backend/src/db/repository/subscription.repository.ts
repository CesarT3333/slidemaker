import { EntityRepository, Repository } from 'typeorm';

import { SubscriptionStatusEnum } from '@model/enum/subscription-status.enum';
import { Subscription } from '@model/subscription';
import User from '@model/user';

@EntityRepository(Subscription)
export class SubscriptionRepository
  extends Repository<Subscription> {

  getForLoggedInUser = async (user: User) => {
    return this.createQueryBuilder('subscriptions')
      .leftJoinAndSelect('subscriptions.user', 'users')
      .leftJoinAndSelect('subscriptions.plan', 'plans')
      .where('users.googleId = :googleId', { googleId: user.googleId })
      .getOne();
  }

  getForLoggedInUserWithStatus = async (user: User) => {
    return this.createQueryBuilder('subscriptions')
      .leftJoinAndSelect('subscriptions.user', 'users')
      .leftJoinAndSelect('subscriptions.plan', 'plans')
      .where('users.googleId = :googleId', { googleId: user.googleId })
      .andWhere('subscriptions.status = :status', { status: SubscriptionStatusEnum.APPROVED })
      .getOne();
  }

}
