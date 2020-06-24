import { MatDialogRef } from '@angular/material/dialog';
import { OnInit, Component } from '@angular/core';
import { SnackBarService } from '@services/snack-bar.service';

@Component({
  templateUrl: './modal-confirms-acquisition-presentation.component.html'
})
export class ModalConfirmsAcquisitionPresentationComponent
  implements OnInit {

  amount = 1;

  ngOnInit(): void { }

  constructor(
    private dialogRef: MatDialogRef<ModalConfirmsAcquisitionPresentationComponent>,
    private snackBarService: SnackBarService
  ) { }

  onConfirm(): void {

    const amountFormatted = Number(this.amount);

    if (this.amountIsValid(amountFormatted)) {
      this.dialogRef.close({ amount: amountFormatted });
    } else {
      this.snackBarService.show('somente números meu chapa ;p');
    }
  }

  onCancel(): void {
    this.dialogRef.close(null);
  }

  private amountIsValid(amount): boolean {
    return amount && !isNaN(amount);
  }

}
