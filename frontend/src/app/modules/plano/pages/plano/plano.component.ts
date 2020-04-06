import { OnInit, Component } from '@angular/core';

import { ApiService } from '../../../../services/api.service';
import { UsuarioService } from '../../../../services/usuario.service';

@Component({
  template: `
    <h1>Plano works</h1>
    <button (click)="onClickButton()">Teste</button>
    <button (click)="logout()">Logou</button>
  ` })
export class PlanoComponent
  implements OnInit {

  constructor(
    private apiService: ApiService,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit(): void { }

  logout() {
    document.location.href =
      'https://www.google.com/accounts/Logout?continue=https://appengine.google.com/_ah/logout?continue=http://localhost:3000';
    localStorage.removeItem('token');
  }

  onClickButton(): void {
    this.apiService.teste()
      .subscribe(res => { });
  }

}
