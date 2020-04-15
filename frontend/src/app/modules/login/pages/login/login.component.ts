import { OnInit, Component } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from '../../../../../environments/environment';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { UsuarioService } from 'src/app/services/usuario.service';
@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent
  implements OnInit {

  loginWindow: any;

  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
    private snackBarService: SnackBarService
  ) { }

  ngOnInit(): void { }

  onClickButtonLogin() {

    const uriAuthGoogle = `${environment.apiUrl}/auth/google`;

    const windowLoginGoogleConfig =
      'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no';

    this.loginWindow = window.open(uriAuthGoogle, '', windowLoginGoogleConfig);

    window.addEventListener('message', event => {
      console.log();
      if (event.data?.jwt) {
        this.onLogin(event.data);
      }
    });

  }

  private onLogin(authResponse) {
    localStorage.setItem('token', `${authResponse.jwt}`);
    this.loginWindow.close();
    window.removeEventListener('message', this.onLogin);
    this.usuarioService.googleProfile = authResponse.profile;
    this.navegaParaPaginaPlanos();
  }

  private navegaParaPaginaPlanos(): void {
    this.router.navigate(['/apresentacao'])
      .catch(e => console.log(e))
      .finally(() => this.snackBarService.show('Logado com sucesso!'));
  }

}
