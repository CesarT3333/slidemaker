import { Controller, Get, UseGuards, Req, Post } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { SubscriptionService } from '@services/subscription.service';
import { Subscription } from '@model/subscription';
import { resources } from '../../util/resources';
import User from '@model/user';

@UseGuards(AuthGuard('jwt'))
@Controller(resources.ASSINATURAS)
export class SubscriptionController {

  constructor(
    private subscription: SubscriptionService
  ) { }

  @Get(`usuario`)
  getForLoggedInUser(@Req() request) {
    const user = <User>{ googleId: request.user.profileId };
    return this.subscription.getForLoggedInUserWithStatus(user);
  }

  @Post()
  async registerTransaction(@Req() request) {
    const signature: Subscription = request.body;
    signature.user = <User>{ googleId: request.user.profileId };

    await this.subscription
      .create(<Subscription>request.body);

  }

}
