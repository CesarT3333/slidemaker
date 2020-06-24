import { PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, Entity } from 'typeorm';

import { SubscriptionStatusEnum } from './enum/subscription-status.enum';
import Plan from './plan';
import User from './user';

@Entity({ name: 'subscriptions' })
export class Subscription {

  @PrimaryGeneratedColumn()
  id?: number;

  @OneToOne(type => User)
  @JoinColumn({
    name: 'id_user',
    referencedColumnName: 'id'
  })
  user: User;

  @OneToOne(type => Plan)
  @JoinColumn({
    name: 'id_plan',
    referencedColumnName: 'id'
  })
  plan: Plan;

  @Column({ name: 'amount_presentation' })
  amountPresentation: number;

  @Column({ name: 'original_amount_presentation' })
  originalAmountPresentation: number;

  @Column({ name: 'amount_paid' })
  amountPaid: number;

  @Column({ name: 'stripe_subscription_id' })
  stripeSubscriptionId: string;

  @Column()
  status?: SubscriptionStatusEnum;

  @Column({ name: 'adding_presentation' })
  addingPresentations?: number;

}
