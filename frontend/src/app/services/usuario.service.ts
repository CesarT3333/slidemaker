import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class UsuarioService {

  constructor(
    private http: HttpClient
  ) { }

  logoutUser() {

    'https://accounts.google.com/o/oauth2/revoke?token="+ACCESS_TOKEN';
  }
}
