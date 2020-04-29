import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ConfiguracaoApresentacaoComponent } from './components/configuracao-apresentacao/configuracao-apresentacao.component';
import { HeaderToolbarComponent } from './components/header-toolbar/header-toolbar.component';
import { ApresentacaoComponent } from './pages/apresentacao/apresentacao.component';
import { ApresentacaoService } from '@services/rest/apresentacao.service';
import { DataSourceService } from '@services/rest/data-sources.service';
import { ThemeComponent } from './components/theme/theme.component';
import { CoverComponent } from './components/cover/cover.component';
import { ApresentacaoRoutingModule } from './apresentacao.routing';
import { FileReaderService } from '@services/file-reade.service';
import { ThemeService } from '@services/rest/theme.service';
import { IdiomService } from '@services/rest/idiom.service';

@NgModule({
  imports: [
    CommonModule,

    ReactiveFormsModule,
    FormsModule,

    MatFormFieldModule,
    MatSelectModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatMenuModule,
    MatIconModule,
    MatStepperModule,

    ApresentacaoRoutingModule,
  ],
  declarations: [
    CoverComponent,
    HeaderToolbarComponent,
    ApresentacaoComponent,
    ThemeComponent,
    ConfiguracaoApresentacaoComponent,
  ],
  providers: [
    ThemeService,
    ApresentacaoService,
    FileReaderService,
    DataSourceService,
    IdiomService,
  ]
})
export class ApresentacaoModule { }
