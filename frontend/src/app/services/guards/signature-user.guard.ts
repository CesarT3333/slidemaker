import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';

import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { SignatureService } from '../rest/signature-user.service';
import { SnackBarService } from '../snack-bar.service';
import { Subscription } from '@models/subscription';
import { SubscriptionStatusEnum } from '@models/enum/subscription-status.enum';

@Injectable({ providedIn: 'root' })
export class SignatureUserGuard
  implements CanActivate {

  constructor(
    private signatureService: SignatureService,
    private snackBarService: SnackBarService,
    private router: Router
  ) { }

  canActivate(): Observable<boolean> | boolean {
    return this.signatureService.searchUserSignature()
      .pipe(
        catchError(_ => {
          this.navigateToThePlansSelectionPage();
          return of(false);
        }),
        map((response: Subscription): boolean => {
          if (!response) {
            this.navigateToThePlansSelectionPage();
            return false;
          } else {
            return true;
          }
        })
      );
  }

  private navigateToThePlansSelectionPage(): void {
    this.router.navigate(['/plans'])
      .then(() => this.displayMessageErrorSignature());
  }

  private displayMessageErrorSignature(): void {
    this.snackBarService.show('Usuário não possui assinatura');
  }

}
