import { MatDialog } from '@angular/material/dialog';
import { OnInit, Component } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';

import { finalize, tap, filter, switchMap } from 'rxjs/operators';

import { ModalConfirmsAcquisitionPresentationComponent } from '../../components/modal-confirms-acquisition/modal-confirms-acquisition-presentation.component';
import { SubscriptionStatusEnum } from '@models/enum/subscription-status.enum';
import { ConfirmService } from 'src/app/modules/ui/services/confirm.service';
import { SignatureService } from '@services/rest/signature-user.service';
import { HandleErrorService } from '@services/handle-error.service';
import { BillingPlanEnum } from '@models/enum/billing-plan.enum';
import { SnackBarService } from '@services/snack-bar.service';
import { LoadingService } from '@services/loading.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UserService } from '@services/user.service';
import { Subscription } from '@models/subscription';
import { PaymentService } from '@services/rest/payment.service';

@Component({
  templateUrl: './subscription-detail.component.html',
  styleUrls: ['./subscription-detail.component.scss']
})
export class SubscriptionDetailComponent
  implements OnInit {

  subscriptionForm: FormGroup;

  private _userSubscription: Subscription;
  private _currencyPipe: CurrencyPipe;

  constructor(
    private handleErrorService: HandleErrorService,
    private subscriptionService: SignatureService,
    private snackBarService: SnackBarService,
    private loadingService: LoadingService,
    private paymentService: PaymentService,
    private confirmService: ConfirmService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private router: Router
  ) {
    this._currencyPipe = new CurrencyPipe('pt');
  }

  ngOnInit(): void {
    this.getUserSubscription();
  }

  onCancelSubscription(): void {
    this.confirmService.open({
      title: 'Cancelamento de Assinatura',
      textBody: 'Você têm certeza que deseja cancelar sua assinatura? =/',
      showCancelButton: true
    }).afterClosed()
      .pipe(
        filter(resultConfirmation => resultConfirmation),
        tap(() => this.loadingService.show()),
        switchMap(() => this.subscriptionService.cancelSubscription()),
        finalize(() => this.loadingService.dismiss())
      ).subscribe(
        _ => {
          this.router.navigate(['/plans']).finally(() =>
            this.snackBarService.show('Assinatura Cancelada com sucesso'));
        },
        error => this.handleErrorService.handle(error)
      );

  }

  onSignPlan(): void {
    this.router.navigate(['/plans']);
  }

  onBackClick(): void {
    this.router.navigate(['/presentation']);
  }

  onAddPresentations(): void {
    this.dialog.open(ModalConfirmsAcquisitionPresentationComponent, {
      width: '500px',
      closeOnNavigation: false,
      disableClose: true,
    }).afterClosed()
      .pipe(filter(resultConfirmation => resultConfirmation))
      .subscribe((amountObject: { amount: number }) => {

        this._userSubscription.addingPresentations = amountObject.amount;
        this.userService.signature = this._userSubscription;

        this.paymentService.makePayment();
      });
  }

  private getUserSubscription(): void {
    this.loadingService.show();
    this.userService.subsctiptionUser()
      .pipe(
        finalize(() => this.loadingService.dismiss()),
        tap(subscription => this._userSubscription = subscription),
        tap(subscription => {
          if (subscription.status === SubscriptionStatusEnum.REPPROVED) {
            this.processInvalidSubscription();
          }
        })

      ).subscribe(
        subscription => this.createFormWithValues(subscription),
        error => this.handleErrorService.handle(error)
      );

  }

  private processInvalidSubscription(): void {
    this.confirmService.open({
      title: 'Assinatura inválida',
      textBody: 'Sua assinatura está inválida <br /> Por favor assine um plano :D'
    }).afterClosed()
      .pipe(tap(() => this.router.navigate(['plans'])))
      .subscribe();
  }

  private createFormWithValues(subscription: Subscription) {
    this.subscriptionForm =
      this.formBuilder.group({
        planName: {
          value: subscription.plan.name,
          disabled: true
        },
        planDescription: {
          value: subscription.plan.description,
          disabled: true
        },
        billingPlanTipe: {
          value: subscription.plan.billingType,
          disabled: true
        },
        amountPresentation: {
          value: subscription.amountPresentation,
          disabled: true
        },
        amountPaid: {
          value: this._currencyPipe.transform(subscription.amountPaid, 'R$'),
          disabled: true
        },
        originalAmountPresentation: {
          value: subscription.originalAmountPresentation,
          disabled: true
        },
        planCost: {
          value: this._currencyPipe.transform(subscription.plan.cost, 'R$'),
          disabled: true
        },
      });
  }

  get isBillingTypePresentation(): boolean {
    return (<BillingPlanEnum>this.subscriptionForm?.get('billingPlanTipe')?.value) === BillingPlanEnum.PRESENTATION;
  }

  get isBillingTypeMonth(): boolean {
    return (<BillingPlanEnum>this.subscriptionForm?.get('billingPlanTipe')?.value) === BillingPlanEnum.MONTH;
  }

  get isFreePlan(): boolean {
    return this._userSubscription?.plan?.id === 4;
  }

  get isStartupPlan(): boolean {
    return this._userSubscription?.plan?.id === 3;
  }

  get amountPaid(): number {
    return this.subscriptionForm?.get('amountPaid')?.value;
  }

  get originalAmountPresentation(): number {
    return this.subscriptionForm?.get('originalAmountPresentation')?.value;
  }

}
