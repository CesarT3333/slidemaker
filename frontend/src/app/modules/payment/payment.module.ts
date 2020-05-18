import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NgxStripeModule } from 'ngx-stripe';

import { PaymentSuccessComponent } from './pages/payment-success/payment-success.component';
import { PaymentService } from '@services/rest/payment.service';
import { PaymentRoutingModule } from './payment.routing';

@NgModule({
  imports: [
    CommonModule,
    NgxStripeModule,
    PaymentRoutingModule,
  ],
  declarations: [PaymentSuccessComponent],
  providers: [PaymentService]
})
export class PaymentMocule { }
