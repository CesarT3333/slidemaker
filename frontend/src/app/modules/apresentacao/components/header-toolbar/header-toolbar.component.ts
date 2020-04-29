import { OnInit, Component } from '@angular/core';

import { UsuarioService } from '@services/usuario.service';
import { GoogleProfile } from '@models/google-profile';
import { AppService } from '@services/app.service';

@Component({
  selector: 'smk-header-toolbar',
  styleUrls: ['./header-toolbar.component.scss'],
  templateUrl: './header-toolbar.component.html'
})
export class HeaderToolbarComponent
  implements OnInit {

  constructor(
    private usuarioService: UsuarioService,
    private appService: AppService
  ) { }

  ngOnInit(): void { }

  onLogoutClick() {
    this.usuarioService.logoutUser();
  }

  get googleProfile(): GoogleProfile {
    return this.usuarioService.googleProfile;
  }

  get userImageProfile(): string {
    return this.usuarioService.googleProfile?.photos[0]?.value ||
      '../../../../../assets/img/Grupo 10.svg';
  }

  get appVersion(): string {
    return this.appService.appVersion;
  }
}
