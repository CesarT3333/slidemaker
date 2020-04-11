import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AssinaturaUsuario } from '../models/assinatura-usuario';
import { GoogleProfile } from '../models/google-profile';
import { Router } from '@angular/router';
import { SnackBarService } from './snack-bar.service';

@Injectable({ providedIn: 'root' })
export class UsuarioService {

  assinatura: AssinaturaUsuario;

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
