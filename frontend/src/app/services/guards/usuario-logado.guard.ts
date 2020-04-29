import { CanActivate, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { GoogleProfile } from '@models/google-profile';
import { SnackBarService } from '../snack-bar.service';
import { UsuarioService } from '../usuario.service';
import { resources } from '@utils/resources';

@Injectable({ providedIn: 'root' })
export class UsuarioLogadoGuard
  implements CanActivate {

  constructor(
    private snackBarService: SnackBarService,
    private usuarioService: UsuarioService,
    private router: Router,
    private http: HttpClient,
  ) { }

  canActivate(): Observable<boolean> | boolean {

    const token: string = localStorage.getItem('token');
    const googleProfile: GoogleProfile = this.usuarioService.googleProfile;

    if (!token || !googleProfile) {
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
