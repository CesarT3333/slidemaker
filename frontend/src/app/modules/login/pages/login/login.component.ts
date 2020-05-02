import { OnInit, Component } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from '../../../../../environments/environment';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { UserService } from 'src/app/services/user.service';
import { AppService } from 'src/app/services/app.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent
  implements OnInit {

  loginWindow: any;

  constructor(
    private snackBarService: SnackBarService,
    private userService: UserService,
    private appService: AppService,
    private router: Router,
  ) { }

  ngOnInit(): void { }

  onClickButtonLogin() {

    const uriAuthGoogle = `${environment.apiUrl}/auth/google`;

    const windowLoginGoogleConfig =
      'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no';

    this.loginWindow = window.open(uriAuthGoogle, '', windowLoginGoogleConfig);

    window.addEventListener('message', event => {
      if (event.data?.jwt) {
        this.onLogin(event.data);
      }
    });

  }

  private onLogin(authResponse) {
    localStorage.setItem('token', `${authResponse.jwt}`);
    this.loginWindow.close();
    window.removeEventListener('message', this.onLogin);
    this.userService.googleProfile = authResponse.profile;
    this.navigateToPagePlans();
  }

  private navigateToPagePlans(): void {
    this.router.navigate(['/presentation'])
      .catch(e => console.log(e))
      .finally(() => this.snackBarService.show('Logado com sucesso!'));
  }

  get appVersion(): string {
    return this.appService.appVersion;
  }

}
