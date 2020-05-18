import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

import { StripeModule } from 'nestjs-stripe';

import { SubscriptionModule } from '../subscription/subscription.module';
import { PaymentService } from '@services/payment.service';
import { PaymentController } from './payment.controller';
import { UserModule } from '../user/user.module';
import { PlanModule } from '../plan/plan.module';

@Module({
  imports: [
    UserModule,
    ConfigModule,
    SubscriptionModule,
    PlanModule,
    StripeModule.forRoot({
      apiVersion: '2020-03-02',
      apiKey: ''
    })
  ],
  controllers: [PaymentController],
  providers: [PaymentService]

})
export class PaymentModule { }
