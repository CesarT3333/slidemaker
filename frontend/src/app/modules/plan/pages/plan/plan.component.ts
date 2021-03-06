import { MatDialog } from '@angular/material/dialog';
import { OnInit, Component } from '@angular/core';
import { Router } from '@angular/router';

import { finalize, filter, tap } from 'rxjs/operators';

import { ModalConfirmsAcquisitionComponent } from '../../components/modal-confirms-acquisition/modal-confirms-acquisition.component';
import { SignatureService } from '@services/rest/signature-user.service';
import { HandleErrorService } from '@services/handle-error.service';
import { PaymentService } from '@services/rest/payment.service';
import { SnackBarService } from '@services/snack-bar.service';
import { LoadingService } from '@services/loading.service';
import { PlanService } from '@services/rest/plan.service';
import { Subscription } from '@models/subscription';
import { UserService } from '@services/user.service';
import Plan from '@models/plan';
import { SubscriptionStatusEnum } from '@models/enum/subscription-status.enum';

@Component({
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.scss']
})
export class PlanComponent
  implements OnInit {

  private _plans: Array<Plan> = [];

  constructor(
    private handleErrorService: HandleErrorService,
    private subscriptionService: SignatureService,
    private snackBarService: SnackBarService,
    private paymentService: PaymentService,
    private loadingService: LoadingService,
    private userService: UserService,
    private planService: PlanService,
    private dialog: MatDialog,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.searchAllPlans();
    this.checkUserHasSignature();
  }

  onPurchasePlan(plan: Plan) {
    this.dialog.open(ModalConfirmsAcquisitionComponent, {
      width: '500px',
      closeOnNavigation: false,
      disableClose: true,
      data: { plan: plan }
    }).afterClosed()
      .pipe(filter(resultConfirmation => resultConfirmation))
      .subscribe((amountObjet: { amount: number }) => {
        this.userService.signature =
          <Subscription>{ plan: plan };

        if (amountObjet) {
          this.userService.signature
            .amountPresentation = amountObjet.amount;
        }

        if (plan.id === 4) {
          this.userService.signature.amountPresentation = 4;
          this.subscriptionService.createSignature(this.userService.signature)
            .subscribe(_ => this.router.navigate(['/presentation']));
        } else {
          this.paymentService.makePayment();
        }

      });
  }

  private searchAllPlans(): void {
    this.loadingService.show();
    this.planService.searchAll()
      .pipe(finalize(() => this.loadingService.dismiss()))
      .subscribe(
        plans => this._plans = plans,
        error => this.handleErrorService.handle(error)
      );
  }

  private checkUserHasSignature(): void {
    this.subscriptionService.searchUserSignature()
      .pipe(
        filter(userSubscription =>
          userSubscription?.status !== SubscriptionStatusEnum.REPPROVED),

        filter(userSubscription => userSubscription.plan.id !== 4)
      ).subscribe(_ => {
        this.loadingService.show();
        this.router.navigate(['/presentation'])
          .then(() => this.snackBarService.show('Usuário já possui assinatura!'))
          .finally(() => this.loadingService.dismiss());
      });
  }

  get plans(): Array<Plan> {
    return this._plans;
  }

}
