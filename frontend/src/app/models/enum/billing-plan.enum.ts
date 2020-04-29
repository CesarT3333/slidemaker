export enum BillingPlanEnum {
  MONTH = 'MONTH',
  PRESENTATION = 'PRESENTATION',
}

export namespace BillingPlanEnum {

  export const getDescricaoTipoDeCobranca =
    (tipoCobranca: BillingPlanEnum): string => {
      switch (tipoCobranca) {
        case BillingPlanEnum.MONTH:
          return 'Por Mês';

        case BillingPlanEnum.PRESENTATION:
          return 'Por Apresentação';
      }
    };

}
