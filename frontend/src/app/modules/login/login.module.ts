import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ButtonLogInGoogleComponent } from './components/button-log-in-google/button-log-in-google.component';
import { LoginComponent } from './pages/login/login.component';
import { LoginRoutingModule } from './login.routing';

@NgModule({
  imports: [
    MatButtonModule,
    MatIconModule,
    CommonModule,
    LoginRoutingModule,
  ],
  declarations: [
    LoginComponent,
    ButtonLogInGoogleComponent
  ]
})
export class LoginModule { }
