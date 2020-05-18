import Plan from './plan';
import { SubscriptionStatusEnum } from './enum/subscription-status.enum';

export interface SignatureUser {
  id?: number;
  user: any;
  plan: Plan;
  idTransacao: string;
  amountPresentation: number;
  status: SubscriptionStatusEnum;
}
