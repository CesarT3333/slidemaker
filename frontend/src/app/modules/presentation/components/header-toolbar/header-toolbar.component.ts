import { OnInit, Component } from '@angular/core';

import { GoogleProfile } from '@models/google-profile';
import { UserService } from '@services/user.service';
import { AppService } from '@services/app.service';

@Component({
  selector: 'smk-header-toolbar',
  styleUrls: ['./header-toolbar.component.scss'],
  templateUrl: './header-toolbar.component.html'
})
export class HeaderToolbarComponent
  implements OnInit {

  constructor(
    private userService: UserService,
    private appService: AppService
  ) { }

  ngOnInit(): void { }

  onLogoutClick() {
    this.userService.logoutUser();
  }

  get googleProfile(): GoogleProfile {
    return this.userService.googleProfile;
  }

  get userImageProfile(): string {
    return this.userService.googleProfile?.photos[0]?.value ||
      '../../../../../assets/img/Grupo 10.svg';
  }

  get appVersion(): string {
    return this.appService.appVersion;
  }
}
