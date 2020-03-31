import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PlanoComponent } from './pages/plano/plano.component';
import { PlanoRoutingModule } from './plano.routing';

@NgModule({
  imports: [
    CommonModule,
    PlanoRoutingModule
  ],
  declarations: [PlanoComponent]
})
export class PlanoModule { }
