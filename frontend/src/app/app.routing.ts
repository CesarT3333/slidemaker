import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { SignatureUserGuard } from './services/guards/signature-user.guard';
import { UserLoggedGuard } from './services/guards/user-logged.guard';

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      {
        path: 'login',
        loadChildren: () => import(`./modules/login/login.module`)
          .then(m => m.LoginModule)
      },
      {
        path: 'plans',
        canActivate: [UserLoggedGuard],
        loadChildren: () => import(`./modules/plan/plan.module`)
          .then(m => m.PlanModule)
      },
      {
        path: 'presentation',
        canActivate: [
          UserLoggedGuard,
          SignatureUserGuard
        ],
        loadChildren: () => import(`./modules/presentation/presentation.module`)
          .then(m => m.PresentationModule)
      },
      {
        path: 'payment',
        canActivate: [UserLoggedGuard],
        loadChildren: () => import(`./modules/payment/payment.module`)
          .then(m => m.PaymentMocule)
      }
    ])],
  exports: [RouterModule]
})
export class AppRoutingModule { }
