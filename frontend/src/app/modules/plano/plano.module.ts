import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ModalConfirmacaoAdiquirimentoComponent } from './components/modal-confirmacao-adquirimento/modal-confirmacao-adquirimento.component';
import { TipoCobrancaPlanoPipe } from './pipes/tipo-cobranca-plano/tipo-cobranca-plano.pipe';
import { PortletPlanoComponent } from './components/portlet-plano/portlet-plano.component';
import { PlanoComponent } from './pages/plano/plano.component';
import { PlanoService } from '@services/rest/plano.service';
import { PlanoRoutingModule } from './plano.routing';

@NgModule({
  imports: [
    ReactiveFormsModule,
    PlanoRoutingModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    CommonModule,
    FormsModule,
  ],
  entryComponents: [
    ModalConfirmacaoAdiquirimentoComponent
  ],
  declarations: [
    ModalConfirmacaoAdiquirimentoComponent,
    PortletPlanoComponent,
    TipoCobrancaPlanoPipe,
    PlanoComponent,
  ],
  providers: [PlanoService]
})
export class PlanoModule { }
