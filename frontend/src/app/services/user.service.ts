import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Subscription } from '@models/subscription';
import { GoogleProfile } from '@models/google-profile';
import { SnackBarService } from './snack-bar.service';
import { resources } from '@utils/resources';

@Injectable({ providedIn: 'root' })
export class UserService {

  signature: Subscription;

  private _googleProfile: GoogleProfile;

  constructor(
    private snackBarService: SnackBarService,
    private http: HttpClient,
    private router: Router,
  ) { }

  logoutUser() {
    this.googleProfile = null;
    localStorage.removeItem('token');
    this.router.navigate(['/login'])
      .then(() => this.snackBarService.show('Usuário deslogado'));
  }

  subsctiptionUser(): Observable<Subscription> {
    return this.http.get<Subscription>(`${resources.SIGNATURES}/usuario`)
      .pipe(take(1));
  }

  set googleProfile(profile) {
    this._googleProfile = profile;
    localStorage.setItem('google_profile', JSON.stringify(profile));
  }

  get googleProfile(): GoogleProfile {
    if (!this._googleProfile) {
      return JSON.parse(localStorage.getItem('google_profile'));
    } else {
      return this._googleProfile;
    }
  }

}
