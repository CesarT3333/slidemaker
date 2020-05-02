import { Injectable } from '@angular/core';

import { SignatureUser } from '@models/signature-user';
import { GoogleProfile } from '@models/google-profile';
import { SnackBarService } from './snack-bar.service';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class UserService {

  signature: SignatureUser;

  private _googleProfile: GoogleProfile;

  constructor(
    private snackBarService: SnackBarService,
    private router: Router,
  ) { }

  logoutUser() {
    this.googleProfile = null;
    localStorage.removeItem('token');
    this.router.navigate(['/login'])
      .then(() => this.snackBarService.show('Usuário deslogado'));
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
