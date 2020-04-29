import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { SubscriptionRepository } from '@repository/subscription.repository';
import { UserSignatureService } from '@services/subscription.service';
import { SubscriptionController } from './subscription.controller';
import { UserModule } from '../usuario/user.module';
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
  providers: [UserSignatureService],
  exports: [UserSignatureService]
})
export class SubscriptionModule { }
