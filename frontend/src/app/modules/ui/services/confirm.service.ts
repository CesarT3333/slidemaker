import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Injectable } from '@angular/core';

import { ModalConfirmComponent } from '../components/modal-confirm/modal-confirm.component';
import { ConfirmData } from '../models/confirm-data';

@Injectable()
export class ConfirmService {

  constructor(
    private dialog: MatDialog,
  ) { }

  open(data: ConfirmData): MatDialogRef<any> {
    return this.dialog.open(
      ModalConfirmComponent,
      {
        data,
        width: '500px',
        closeOnNavigation: false,
        disableClose: true,
      }
    );
  }

}
