import { OnInit, Component } from '@angular/core';
import { Router } from '@angular/router';

import { finalize, switchMap, map } from 'rxjs/operators';

import { SignatureService } from '@services/rest/signature-user.service';
import { HandleErrorService } from 'src/app/services/handle-error.service';
import { PaymentService } from '@services/rest/payment.service';
import { SignatureUser } from 'src/app/models/signature-user';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { LoadingService } from 'src/app/services/loading.service';
import { UserService } from 'src/app/services/user.service';
import Plan from 'src/app/models/plan';

@Component({
  template: `
    <h1>Pagamento e geração de assinatura</h1>
    <button (click)="onConfirmFormPayment()">
      Confirmar Pagamento
    </button>
` })
export class PaymentComponent
  implements OnInit {

  constructor(
    private handleErrorService: HandleErrorService,
    private paymentService: PaymentService,
    private signatureService: SignatureService,
    // private transacaoService: TransacaoService,
    private snackBarService: SnackBarService,
    private userService: UserService,
    private loadingService: LoadingService,
    private router: Router
  ) { }

  ngOnInit(): void { }

  onConfirmFormPayment(): void {

    this.loadingService.show();
    this.paymentService.confirmPayment()
      .pipe(

        map((idTransacao: string): SignatureUser => {
          const signature = this.userService.signature;

          signature.idTransacao = idTransacao;
          signature.plan = <Plan>{ id: signature.plan.id };

          return signature;

        }),

        switchMap((signature: SignatureUser) =>
          this.signatureService.createSignature(signature)),

        finalize(() => this.loadingService.dismiss()),

      ).subscribe(
        _ =>
          this.router.navigate(['/presentation'])
            .then(() => this.snackBarService.show('Assinatura realizada com sucesso')),

        error => this.handleErrorService.handle(error)
      );

  }

}
