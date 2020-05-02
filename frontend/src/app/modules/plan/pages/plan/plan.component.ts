import { MatDialog } from '@angular/material/dialog';
import { OnInit, Component } from '@angular/core';
import { Router } from '@angular/router';

import { finalize, filter } from 'rxjs/operators';

import { ModalConfirmsAcquisitionComponent } from '../../components/modal-confirms-acquisition/modal-confirms-acquisition.component';
import { SignatureService } from '@services/rest/signature-user.service';
import { HandleErrorService } from '@services/handle-error.service';
import { SignatureUser } from '@models/signature-user';
import { SnackBarService } from '@services/snack-bar.service';
import { LoadingService } from '@services/loading.service';
import { UserService } from '@services/user.service';
import { PlanService } from '@services/rest/plan.service';
import Plan from '@models/plan';

@Component({
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.scss']
})
export class PlanComponent
  implements OnInit {

  private _plans: Array<Plan> = [];

  constructor(
    private handleErrorService: HandleErrorService,
    private signatureService: SignatureService,
    private snackBarService: SnackBarService,
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

  onPurchasePlan($event: Plan) {
    this.dialog.open(ModalConfirmsAcquisitionComponent, {
      width: '500px',
      closeOnNavigation: false,
      disableClose: true,
      data: { plan: $event }
    }).afterClosed()
      .pipe(filter(resultConfirmation => resultConfirmation))
      .subscribe((amountObjeto: { amount: number }) => {
        this.userService.signature =
          <SignatureUser>{ plan: $event };

        if (amountObjeto) {
          this.userService.signature
            .amountPresentation = amountObjeto.amount;
        }

        this.router.navigate(['./payment']);
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
    this.signatureService.searchUserSignature()
      .subscribe(assinatura => {
        if (assinatura) {
          this.loadingService.show();
          this.router.navigate(['/presentation'])
            .then(() => this.snackBarService.show('Usuário já possui assinatura!'))
            .finally(() => this.loadingService.dismiss());
        }
      });
  }

  get plans(): Array<Plan> {
    return this._plans;
  }

}
