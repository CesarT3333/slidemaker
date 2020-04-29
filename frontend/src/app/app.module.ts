import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { BrowserModule } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import { NgModule, LOCALE_ID } from '@angular/core';
import ptBr from '@angular/common/locales/pt';

import { LoadingComponent } from './components/loading/loading.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { AppInterceptor } from './services/rest/app.interceptor';
import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';

registerLocaleData(ptBr);

@NgModule({
  declarations: [
    AppComponent,
    LoadingComponent,
    DialogComponent
  ],
  imports: [
    MatFormFieldModule,
    MatSnackBarModule,
    MatButtonModule,
    MatDialogModule,

    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,

    AppRoutingModule,
  ],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'pt'
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppInterceptor,
      multi: true
    },
  ]
})
export class AppModule { }
