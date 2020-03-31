import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PlanoComponent } from './pages/plano/plano.component';

const planoRoutes: Routes = [
  { path: '', component: PlanoComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(planoRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class PlanoRoutingModule { }
