import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PagamentoComponent } from './pages/pagamento/pagamento.component';
import { PagamentoService } from '@services/rest/pagamento.service';
import { TransacaoService } from '@services/rest/transacao.service';
import { PagamentoRoutingModule } from './pagamento.routing';

@NgModule({
  imports: [
    CommonModule,
    PagamentoRoutingModule
  ],
  declarations: [
    PagamentoComponent
  ],
  providers: [
    PagamentoService,
    TransacaoService
  ]
})
export class PagamentoMocule { }
