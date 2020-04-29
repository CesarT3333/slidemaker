import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OnInit, Component, Inject } from '@angular/core';

import { DialogData } from 'src/app/models/dialog-data';

@Component({
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent
  implements OnInit {

  private _dialogData: DialogData;

  ngOnInit(): void { }

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) dialogData: DialogData
  ) { this._dialogData = dialogData; }

  get dialogData(): DialogData {
    return this._dialogData;
  }

}
