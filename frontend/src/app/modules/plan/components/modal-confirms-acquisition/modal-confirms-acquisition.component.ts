import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OnInit, Component, Inject } from '@angular/core';

import { BillingPlanEnum } from '@models/enum/billing-plan.enum';
import { SnackBarService } from '@services/snack-bar.service';
import Plan from '@models/plan';

@Component({
  templateUrl: './modal-confirms-acquisition.component.html'
})
export class ModalConfirmsAcquisitionComponent
  implements OnInit {

  amount = 1;

  private _plan: Plan;

  ngOnInit(): void { }

  constructor(
    private dialogRef: MatDialogRef<ModalConfirmsAcquisitionComponent>,
    private snackBarService: SnackBarService,
    @Inject(MAT_DIALOG_DATA) data: { plan: Plan }
  ) {
    this._plan = data.plan;
  }

  onConfirm(): void {
    if (this._plan.billingType === BillingPlanEnum.PRESENTATION) {

      const amountFormatted = Number(this.amount);

      if (this.amountIsValid(amountFormatted)) {
        this.dialogRef.close({ amount: amountFormatted });
      } else {
        this.snackBarService.show('Informe um valor válido para campo do tipo numérico');
        this.amount = 1;
      }
    } else {
      this.dialogRef.close({ amount: 0 });
    }
  }

  onCancel(): void {
    this.dialogRef.close(null);
  }

  private amountIsValid(amount): boolean {
    return amount && !isNaN(amount);
  }

  get plan(): Plan {
    return this._plan;
  }

  get planPaidForNumberOfPresentations(): boolean {
    return this._plan.billingType === BillingPlanEnum.PRESENTATION && this._plan.id !== 4;
  }
}
