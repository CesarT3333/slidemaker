import { EntityRepository, Repository } from 'typeorm';

import User from '@model/user';
import { Subscription } from '@model/subscription';

@EntityRepository(Subscription)
export class SubscriptionRepository
  extends Repository<Subscription> {

  getForLoggedInUser = async (user: User) => {
    return this.createQueryBuilder('subscriptions')
      .leftJoinAndSelect('subscriptions.user', 'users')
      .leftJoinAndSelect('subscriptions.plan', 'plans')
      .where('users.googleId = :googleId',
        { googleId: user.googleId })
      .getOne();
  }

}
