import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PaymentComponent } from './pages/payment/payment.component';

@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: PaymentComponent }
  ])],
  exports: [RouterModule]
})
export class PaymentRoutingModule { }
