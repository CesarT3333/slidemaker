import { TipoCobrancaPlanoEnum } from './enum/tipo-cobranca-plano.enum';

export default interface Plano {
  id?: number;
  nome: string;
  descricao: string;
  valor: number;
  atributos: string;
  tipoCobrancaPlano: TipoCobrancaPlanoEnum;
}
