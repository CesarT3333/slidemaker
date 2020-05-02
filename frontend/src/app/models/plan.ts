import { BillingPlanEnum } from './enum/billing-plan.enum';

export default interface Plan {
  id?: number;
  name: string;
  description: string;
  cost: number;
  attributes: string;
  billingType: BillingPlanEnum;
}
