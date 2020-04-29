import { Controller, Get, UseGuards, Req, Post } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { UserSignatureService } from '@services/subscription.service';
import { Subscription } from '@model/subscription';
import { resources } from '../../util/resources';
import User from '@model/user';

@UseGuards(AuthGuard('jwt'))
@Controller(resources.ASSINATURAS)
export class SubscriptionController {

  constructor(
    private userSignatureService: UserSignatureService
  ) { }

  @Get(`usuario`)
  getForLoggedInUser(@Req() request) {
    const user = <User>{ googleId: request.user.profileId };
    return this.userSignatureService.getForLoggedInUser(user);
  }

  @Post()
  async registraTransacao(@Req() request) {
    const signature: Subscription = request.body;
    signature.user = <User>{ googleId: request.user.profileId };

    await this.userSignatureService
      .create(<Subscription>request.body);

  }

}
