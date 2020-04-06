import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SnackBarService } from '../snack-bar.service';

@Injectable({ providedIn: 'root' })
export class UsuarioLogadoGuard
  implements CanActivate {

  constructor(
    private readonly snackBarService: SnackBarService,
    private readonly router: Router,
    private readonly http: HttpClient,
  ) { }

  canActivate(): Observable<boolean> | boolean {

    const token: string = localStorage.getItem('token');

    if (!token) {
      this.exibeMensagemErroLogin();
      this.navegaParaPaginaDeLogin();
      return false;
    }

    return this.http.get('auth/usuario-logado')
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
