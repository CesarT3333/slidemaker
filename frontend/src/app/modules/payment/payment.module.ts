import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PaymentComponent } from './pages/payment/payment.component';
import { PaymentService } from '@services/rest/payment.service';
import { TransactionService } from '@services/rest/transactionservice';
import { PaymentRoutingModule } from './payment.routing';

@NgModule({
  imports: [
    CommonModule,
    PaymentRoutingModule
  ],
  declarations: [
    PaymentComponent
  ],
  providers: [
    PaymentService,
    TransactionService
  ]
})
export class PaymentMocule { }
