import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ConfiguracaoApresentacaoComponent } from './components/configuracao-apresentacao/configuracao-apresentacao.component';
import { HeaderToolbarComponent } from './components/header-toolbar/header-toolbar.component';
import { ApresentacaoComponent } from './pages/apresentacao/apresentacao.component';
import { ApresentacaoRoutingModule } from './apresentacao.routing';

@NgModule({
  imports: [
    CommonModule,

    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,

    ApresentacaoRoutingModule,
  ],
  declarations: [
    ApresentacaoComponent,

    ConfiguracaoApresentacaoComponent,
    HeaderToolbarComponent,
  ]
})
export class ApresentacaoModule { }
