import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatStepperModule } from '@angular/material/stepper';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SocketIoModule } from 'ngx-socket-io';

import { ModalSuccessfulPresentationCreationComponent } from './components/successful-presentation-creation.component/modal-successful-presentation-creation.component';
import { ModalProgressPresentationComponent } from './components/modal-progress-presentation/modal-progress-presentation.component';
import { PresentationSetupComponent } from './components/presentation-setup/presentation-setup.component';
import { ListPresentationComponent } from './components/list-presentation/list-presentation.component';
import { ProgressDescriptionPipe } from './pipes/progress-description/progress-description.pipe';
import { HeaderToolbarComponent } from './components/header-toolbar/header-toolbar.component';
import { PresentationComponent } from './pages/presentation/presentation.component';
import { PresentationService } from '@services/rest/presentation.service';
import { DataSourceService } from '@services/rest/data-sources.service';
import { SortByDatePipe } from './pipes/sort-by-date/sort-by-date.pipe';
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

    SocketIoModule.forRoot({
      url: 'http://localhost:4000/presentation',
      options: {
        query: {
          token: localStorage.getItem('token')
        }
      }
    }),
    MatProgressBarModule,
    MatFormFieldModule,
    MatGridListModule,
    MatStepperModule,
    MatToolbarModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatCardModule,
    MatListModule,
    MatMenuModule,
    MatIconModule,

    PresentationRoutingModule,
  ],
  declarations: [
    ModalSuccessfulPresentationCreationComponent,
    ModalProgressPresentationComponent,
    PresentationSetupComponent,
    ListPresentationComponent,
    HeaderToolbarComponent,
    CoverComponent,
    ThemeComponent,

    ProgressDescriptionPipe,
    SortByDatePipe,

    PresentationComponent,
  ],
  providers: [
    PresentationService,
    FileReaderService,
    DataSourceService,
    ThemeService,
    IdiomService,
  ]
})
export class PresentationModule { }
