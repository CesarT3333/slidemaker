import Plano from './plano';

export interface AssinaturaUsuario {
  id?: number;
  usuario: any;
  plano: Plano;
  quantidadeApresentacoes: number;
}