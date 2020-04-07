import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PortletPlanoComponent } from './components/portlet-plano/portlet-plano.component';
import { PlanoComponent } from './pages/plano/plano.component';
import { PlanoService } from 'src/app/services/plano.service';
import { PlanoRoutingModule } from './plano.routing';

@NgModule({
  imports: [
    CommonModule,
    PlanoRoutingModule
  ],
  declarations: [
    PlanoComponent,
    PortletPlanoComponent
  ],
  providers: [
    PlanoService
  ]
})
export class PlanoModule { }
