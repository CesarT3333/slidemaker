import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PagamentoComponent } from './pages/pagamento/pagamento.component';
import { PagamentoService } from 'src/app/services/pagamento.service';
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
    PagamentoService
  ]
})
export class PagamentoMocule { }
