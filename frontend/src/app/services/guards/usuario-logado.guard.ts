import { CanActivate, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { SnackBarService } from '../snack-bar.service';
import { resources } from 'src/app/util/resources';

@Injectable({ providedIn: 'root' })
export class UsuarioLogadoGuard
  implements CanActivate {

  constructor(
    private snackBarService: SnackBarService,
    private router: Router,
    private http: HttpClient,
  ) { }

  canActivate(): Observable<boolean> | boolean {

    const token: string = localStorage.getItem('token');

    if (!token) {
      this.exibeMensagemErroLogin();
      this.navegaParaPaginaDeLogin();
      return false;
    }

    return this.http.get(`${resources.AUTH_USUARIO_LOGADO}`)
      .pipe(
        catchError(_ => {
          this.exibeMensagemErroLogin();
          this.navegaParaPaginaDeLogin();
          return of(false);
        }),
        map(_ => true)
      );
  }

  private exibeMensagemErroLogin(): void {
    this.snackBarService.show(
      'Erro de autenticação. Logue no sistema novamente!'
    );
  }

  private navegaParaPaginaDeLogin(): void {
    this.router.navigate(['/login']);
  }

}
