import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ConfiguracaoApresentacaoComponent } from './pages/configuracao-apresentacao/configuracao-apresentacao.component';
import { ConfiguracaoApresentacaoRoutingModule } from './configuracao-apresentacao.routing';

@NgModule({
  imports: [
    CommonModule,
    ConfiguracaoApresentacaoRoutingModule,
  ],
  declarations: [
    ConfiguracaoApresentacaoComponent
  ]
})
export class ConfiguracaoApresentacaoModule { }
