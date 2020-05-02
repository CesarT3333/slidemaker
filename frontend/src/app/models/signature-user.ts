import Plan from './plan';

export interface SignatureUser {
  id?: number;
  user: any;
  plan: Plan;
  idTransacao: string;
  amountPresentation: number;
}
