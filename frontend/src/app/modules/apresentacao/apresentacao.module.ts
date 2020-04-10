import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ConfiguracaoApresentacaoComponent } from './pages/configuracao-apresentacao/configuracao-apresentacao.component';
import { ApresentacaoComponent } from './pages/apresentacao/apresentacao.component';
import { ApresentacaoRoutingModule } from './apresentacao.routing';

@NgModule({
  imports: [
    CommonModule,
    ApresentacaoRoutingModule,
  ],
  declarations: [
    ApresentacaoComponent,
    ConfiguracaoApresentacaoComponent
  ]
})
export class ApresentacaoModule { }
