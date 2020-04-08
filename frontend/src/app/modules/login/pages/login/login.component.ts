import { OnInit, Component } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from '../../../../../environments/environment';
import { SnackBarService } from 'src/app/services/snack-bar.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent
  implements OnInit {

  loginWindow: any;

  constructor(
    private router: Router,
    private snackBarService: SnackBarService
  ) { }

  ngOnInit(): void { }

  onClickButtonLogin() {

    const uriAuthGoogle = `${environment.apiUrl}/auth/google`;

    const windowLoginGoogleConfig =
      'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no';

    this.loginWindow = window.open(uriAuthGoogle, '', windowLoginGoogleConfig);

    window.addEventListener('message', event => {
      if (typeof event.data === 'string') {
        this.onLogin(event.data);
      }
    });

  }

  private onLogin(token) {
    localStorage.setItem('token', `${token}`);
    this.loginWindow.close();
    window.removeEventListener('message', this.onLogin);
    this.navegaParaPaginaPlanos();
  }

  private navegaParaPaginaPlanos(): void {
    this.router.navigate(['/configuracao-apresentacao'])
      .catch(e => console.log(e))
      .finally(() => this.snackBarService.show('Logado com sucesso!'));
  }

}
