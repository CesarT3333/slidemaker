import { PipeTransform, Pipe } from '@angular/core';

import { BillingPlanEnum } from '@models/enum/billing-plan.enum';

@Pipe({ name: 'tipoCobrancaPlanoPipe' })
export class TipoCobrancaPlanoPipe
  implements PipeTransform {

  transform(tipoCobranca: BillingPlanEnum): string {
    return BillingPlanEnum.getDescricaoTipoDeCobranca(tipoCobranca);
  }

}
