import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ConfiguracaoApresentacaoComponent } from './components/configuracao-apresentacao/configuracao-apresentacao.component';
import { HeaderToolbarComponent } from './components/header-toolbar/header-toolbar.component';
import { ApresentacaoComponent } from './pages/apresentacao/apresentacao.component';
import { ApresentacaoService } from 'src/app/services/apresentacao.service';
import { DataSourceService } from 'src/app/services/data-sources.service';
import { ApresentacaoRoutingModule } from './apresentacao.routing';
import { IdiomService } from 'src/app/services/idiom.service';

@NgModule({
  imports: [
    CommonModule,

    ReactiveFormsModule,
    FormsModule,

    MatFormFieldModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatMenuModule,
    MatIconModule,

    ApresentacaoRoutingModule,
  ],
  declarations: [
    ApresentacaoComponent,

    ConfiguracaoApresentacaoComponent,
    HeaderToolbarComponent,
  ],
  providers: [
    ApresentacaoService,
    DataSourceService,
    IdiomService,
  ]
})
export class ApresentacaoModule { }
