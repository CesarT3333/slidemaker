import { OnInit, Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent
  implements OnInit {

  loginWindow: any;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void { }

  onClickButtonLogin() {

    const uriAuthGoogle =
      'http://localhost:4200/auth/google';

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
    this.router.navigate(['/planos']);
  }

}
