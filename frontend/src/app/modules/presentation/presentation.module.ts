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

import { PresentationSetupComponent } from './components/presentation-setup/presentation-setup.component';
import { HeaderToolbarComponent } from './components/header-toolbar/header-toolbar.component';
import { PresentationComponent } from './pages/presentation/presentation.component';
import { PresentationService } from '@services/rest/presentation.service';
import { DataSourceService } from '@services/rest/data-sources.service';
import { ThemeComponent } from './components/theme/theme.component';
import { CoverComponent } from './components/cover/cover.component';
import { PresentationRoutingModule } from './presentation.routing';
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

    PresentationRoutingModule,
  ],
  declarations: [
    CoverComponent,
    HeaderToolbarComponent,
    PresentationComponent,
    ThemeComponent,
    PresentationSetupComponent,
  ],
  providers: [
    ThemeService,
    PresentationService,
    FileReaderService,
    DataSourceService,
    IdiomService,
  ]
})
export class PresentationModule { }
