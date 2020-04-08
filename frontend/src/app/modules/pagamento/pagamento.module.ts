import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AssinaturaService } from 'src/app/services/assinatura-usuario.service';
import { PagamentoComponent } from './pages/pagamento/pagamento.component';
import { PagamentoService } from 'src/app/services/pagamento.service';
import { TransacaoService } from 'src/app/services/transacao.service';
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
