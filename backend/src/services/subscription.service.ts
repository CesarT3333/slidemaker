import { Injectable } from '@nestjs/common';

import { SubscriptionRepository } from '@repository/subscription.repository';
import { Subscription } from '@model/subscription';
import { UserService } from './user.service';
import User from '@model/user';

@Injectable()
export class UserSignatureService {

  constructor(
    private subscriptionRepository: SubscriptionRepository,
    private userService: UserService
  ) { }

  async getForLoggedInUser(user: User): Promise<Subscription> {
    return this.subscriptionRepository.getForLoggedInUser(user);
  }

  async create(subscription: Subscription): Promise<any> {

    const idUsuario: number = await this.userService
      .getIdByGoogleId(subscription.user.googleId);

    subscription.user.id = idUsuario;

    return this.subscriptionRepository.save(subscription);
  }

}
