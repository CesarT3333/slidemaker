import { CanActivate, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { GoogleProfile } from '@models/google-profile';
import { SnackBarService } from '../snack-bar.service';
import { UserService } from '../user.service';
import { resources } from '@utils/resources';

@Injectable({ providedIn: 'root' })
export class UserLoggedGuard
  implements CanActivate {

  constructor(
    private snackBarService: SnackBarService,
    private userService: UserService,
    private http: HttpClient,
    private router: Router,
  ) { }

  canActivate(): Observable<boolean> | boolean {

    const token: string = localStorage.getItem('token');
    const googleProfile: GoogleProfile = this.userService.googleProfile;

    if (!token || !googleProfile) {
      this.displayMessageErrorLogin();
      this.navigateToPageLogin();
      return false;
    }

    return this.http.get(`${resources.AUTH_USER_LOGGED}`)
      .pipe(
        catchError(_ => {
          this.displayMessageErrorLogin();
          this.navigateToPageLogin();
          return of(false);
        }),
        map(_ => true)
      );
  }

  private displayMessageErrorLogin(): void {
    this.snackBarService.show(
      'Erro de autenticação. Logue no sistema novamente!'
    );
  }

  private navigateToPageLogin(): void {
    this.router.navigate(['/login']);
  }

}
