import { PipeTransform, Pipe } from '@angular/core';

import { BillingPlanEnum } from '@models/enum/billing-plan.enum';

@Pipe({ name: 'planBillingTypePipe' })
export class PlanBillingTypePipe
  implements PipeTransform {

  transform(billingType: BillingPlanEnum): string {
    return BillingPlanEnum.getDescritionBillingType(billingType);
  }

}
