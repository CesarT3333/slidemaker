import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

import { BillingPlanEnum } from './enum/billing-plan.enum';

@Entity({ name: 'plans' })
export default class Plan {

  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  cost: number;

  @Column()
  attributes: string;

  @Column({ name: 'billing_type' })
  billingType: BillingPlanEnum;

}
