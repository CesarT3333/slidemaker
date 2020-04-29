import { MatDialog } from '@angular/material/dialog';
import { Injectable } from '@angular/core';

import { DialogComponent } from '../components/dialog/dialog.component';
import { DialogData } from '@models/dialog-data';

@Injectable({ providedIn: 'root' })
export class DialogService {

  constructor(
    public dialog: MatDialog
  ) { }

  open(dialogData: DialogData | string) {

    return this.dialog.open(DialogComponent, {
      width: 'auto',
      disableClose: true,
      data: dialogData,
    }).afterClosed();
  }

}
