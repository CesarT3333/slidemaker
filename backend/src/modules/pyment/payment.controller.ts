import { Controller, Post, Req, Get, UseGuards, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { PaymentService } from '@services/payment.service';
import { Subscription } from '@model/subscription';
import { resources } from 'src/util/resources';
import User from '@model/user';

@Controller(`${resources.PAYMENTS}`)
export class PaymentController {

  constructor(
    private paymentService: PaymentService
  ) { }

  @Post('stripe-session')
  @UseGuards(AuthGuard('jwt'))
  async createStripeSession(@Req() req) {
    const subscription = <Subscription>req.body;
    subscription.user = <User>{ googleId: req.user.profileId };
    return this.paymentService.createStripeSession(subscription);
  }

  @Get('confirm-payment/:sessionId')
  @UseGuards(AuthGuard('jwt'))
  async confirmPayment(
    @Param('sessionId') sessionId: string,
    @Req() request
  ): Promise<any> {
    const user = <User>{ googleId: request.user.profileId };
    return await this.paymentService.confirmPayment(sessionId, user);
  }

}
