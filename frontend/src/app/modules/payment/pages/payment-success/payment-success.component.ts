import { PaymentService } from '@services/rest/payment.service';
import { LoadingService } from '@services/loading.service';
import { ActivatedRoute, Router } from '@angular/router';
import { OnInit, Component } from '@angular/core';

import { finalize, retry } from 'rxjs/operators';

import { HandleErrorService } from '@services/handle-error.service';
import { SnackBarService } from '@services/snack-bar.service';

@Component({ template: `` })
export class PaymentSuccessComponent
  implements OnInit {

  constructor(
    private handleErrorService: HandleErrorService,
    private snackBarService: SnackBarService,
    private activatedRoute: ActivatedRoute,
    private paymentService: PaymentService,
    private loadingService: LoadingService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.loadingService.show();

    const sessionId: string =
      this.activatedRoute.snapshot.params['sessionId'];

    this.paymentService.confirmPayment(sessionId)
      .pipe(
        finalize(() => this.loadingService.dismiss()),
        retry(3)
      ).subscribe(
        _ => this.router.navigate(['/presentation'])
          .finally(() => this.snackBarService.show('Pagamento confirmado com sucesso')),

        error => this.handleErrorService.handle(error)
      );
  }

}
