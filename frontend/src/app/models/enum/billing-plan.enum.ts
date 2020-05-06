export enum BillingPlanEnum {
  MONTH = 'MONTH',
  PRESENTATION = 'PRESENTATION',
}

export namespace BillingPlanEnum {

  export const getDescritionBillingType =
    (billingType: BillingPlanEnum): string => {
      switch (billingType) {
        case BillingPlanEnum.MONTH:
          return 'Por Mês';

        case BillingPlanEnum.PRESENTATION:
          return 'Por Apresentação';
      }
    };

}
