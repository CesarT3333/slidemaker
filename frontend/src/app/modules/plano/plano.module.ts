import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PortletPlanoComponent } from './components/portlet-plano/portlet-plano.component';
import { PlanoComponent } from './pages/plano/plano.component';
import { PlanoRoutingModule } from './plano.routing';

@NgModule({
  imports: [
    CommonModule,
    PlanoRoutingModule
  ],
  declarations: [
    PlanoComponent,
    PortletPlanoComponent
  ]
})
export class PlanoModule { }
