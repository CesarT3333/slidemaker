import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OnInit, Component, Inject } from '@angular/core';
import { ConfirmData } from '../../models/confirm-data';

@Component({
  templateUrl: './modal-confirm.component.html'
})
export class ModalConfirmComponent
  implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<ModalConfirmComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: ConfirmData
  ) { }

  ngOnInit(): void { }

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

}
