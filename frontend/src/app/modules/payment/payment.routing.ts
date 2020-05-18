import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PaymentSuccessComponent } from './pages/payment-success/payment-success.component';

@NgModule({
  imports: [RouterModule.forChild([
    { path: 'success/:sessionId', component: PaymentSuccessComponent },
  ])],
  exports: [RouterModule]
})
export class PaymentRoutingModule { }
