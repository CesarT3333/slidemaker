import { HttpClient } from '@angular/common/http';
import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { AssinaturaService } from '../assinatura-usuario.service';
import { catchError, map } from 'rxjs/operators';
import { SnackBarService } from '../snack-bar.service';

@Injectable({ providedIn: 'root' })
export class AssinaturaUsuarioGuard
  implements CanActivate {

  constructor(
    private assinaturaService: AssinaturaService,
    private snackBarService: SnackBarService,
    private router: Router
  ) { }

  canActivate(): Observable<boolean> | boolean {
    return this.assinaturaService.buscaAssinaturaUsuario()
      .pipe(
        catchError(error => {
          // this.exibeMensagemErroAssinatura();
          this.navegaParaPaginaDeEscolhaDePlanos();
          return of(false);
        }),
        map(response => {
          if (!response) {
            // this.exibeMensagemErroAssinatura();
            this.navegaParaPaginaDeEscolhaDePlanos();
            return false;
          } else {
            return true;
          }
        })
      );
  }

  private navegaParaPaginaDeEscolhaDePlanos(): void {
    this.router.navigate(['/planos'])
      .then(() => this.exibeMensagemErroAssinatura());
  }

  private exibeMensagemErroAssinatura(): void {
    this.snackBarService.show('Usuário não possui assinatura');
  }

}
