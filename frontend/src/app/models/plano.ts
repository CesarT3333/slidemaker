import { BillingPlanEnum } from './enum/billing-plan.enum';

export default interface Plano {
  id?: number;
  name: string;
  description: string;
  cost: number;
  attributes: string;
  billingType: BillingPlanEnum;
}
