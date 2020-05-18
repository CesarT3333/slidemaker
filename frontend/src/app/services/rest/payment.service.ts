import { Injectable } from '@angular/core';

import { take, finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { StripeService } from 'ngx-stripe';

import { LoadingService } from '@services/loading.service';
import { SignatureUser } from '@models/signature-user';
import { UserService } from '@services/user.service';
import { HttpClient } from '@angular/common/http';
import { resources } from '@utils/resources';
import { ConfigurationService } from './configuration.service';

@Injectable()
export class PaymentService {

  constructor(
    private configurationService: ConfigurationService,
    private loadingService: LoadingService,
    private stripeService: StripeService,
    private userService: UserService,
    private http: HttpClient,
  ) { }

  makePayment(): void {
    this.loadingService.show();

    this.configurationService.getStripePublicKey()
      .subscribe(stripePublicKey => {

        this.createStripeSession(
          this.userService.signature
        ).pipe(finalize(() => this.loadingService.dismiss()))
          .subscribe(response => {
            this.stripeService.getStripeReference()
              .subscribe(stripe => {
                stripe(stripePublicKey)
                  .redirectToCheckout({ sessionId: response.id });
              });
          });
      });

  }

  confirmPayment(stripeSessionId: string) {
    return this.http.get(`${resources.PAYMENTS}/confirm-payment/${stripeSessionId}`)
      .pipe(take(1));
  }

  private createStripeSession(signature: SignatureUser): Observable<any> {
    return this.http.post(`${resources.PAYMENTS}/stripe-session`, signature)
      .pipe(take(1));
  }

}
