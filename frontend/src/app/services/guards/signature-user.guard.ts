import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';

import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { SignatureService } from '../rest/signature-user.service';
import { SnackBarService } from '../snack-bar.service';

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
        catchError(error => {
          // this.exibeMensagemErroAssinatura();
          this.navigateToThePlansSelectionPage();
          return of(false);
        }),
        map(response => {
          if (!response) {
            // this.exibeMensagemErroAssinatura();
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
