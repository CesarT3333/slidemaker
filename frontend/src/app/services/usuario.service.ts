import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AssinaturaUsuario } from '../models/assinatura-usuario';

@Injectable({ providedIn: 'root' })
export class UsuarioService {

  assinatura: AssinaturaUsuario;

  constructor(
    private http: HttpClient
  ) { }

  logoutUser() {
    // 'https://accounts.google.com/o/oauth2/revoke?token="+ACCESS_TOKEN';
  }
}
