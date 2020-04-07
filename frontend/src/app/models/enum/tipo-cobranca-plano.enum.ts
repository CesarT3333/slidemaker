export enum TipoCobrancaPlanoEnum {
  POR_MES = 'POR_MES',
  POR_APRESENTACAO = 'POR_APRESENTACAO',
}

export namespace TipoCobrancaPlanoEnum {

  export const getDescricaoTipoDeCobranca =
    (tipoCobranca: TipoCobrancaPlanoEnum): string => {
      switch (tipoCobranca) {
        case TipoCobrancaPlanoEnum.POR_MES:
          return 'Por Mês';

        case TipoCobrancaPlanoEnum.POR_APRESENTACAO:
          return 'Por Apresentação';
      }
    };

}
