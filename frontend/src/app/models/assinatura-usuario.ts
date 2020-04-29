import Plano from './plano';

export interface AssinaturaUsuario {
  id?: number;
  user: any;
  plan: Plano;
  idTransacao: string;
  amountPresentation: number;
}
