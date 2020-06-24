import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ModalConfirmComponent } from './components/modal-confirm/modal-confirm.component';
import { ConfirmService } from './services/confirm.service';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    CommonModule,

    MatDialogModule,
    MatButtonModule,
  ],
  declarations: [
    ModalConfirmComponent
  ],
  exports: [
    ModalConfirmComponent
  ],
  providers: [
    ConfirmService
  ]
})
export class UiModule { }
