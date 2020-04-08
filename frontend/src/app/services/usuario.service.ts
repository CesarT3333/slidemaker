import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import Plano from '../models/plano';

@Injectable({ providedIn: 'root' })
export class UsuarioService {

  planoUsuario: Plano;

  constructor(
    private http: HttpClient
  ) { }

  logoutUser() {
    // 'https://accounts.google.com/o/oauth2/revoke?token="+ACCESS_TOKEN';
  }
}
