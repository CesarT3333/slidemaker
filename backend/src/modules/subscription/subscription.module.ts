import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { SubscriptionRepository } from '@repository/subscription.repository';
import { SubscriptionService } from '@services/subscription.service';
import { SubscriptionController } from './subscription.controller';
import { UserModule } from '../user/user.module';
import { Subscription } from '@model/subscription';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Subscription,
      SubscriptionRepository
    ]),
    UserModule
  ],
  controllers: [SubscriptionController],
  providers: [SubscriptionService],
  exports: [SubscriptionService]
})
export class SubscriptionModule { }
