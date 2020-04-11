import { OnInit, Component } from '@angular/core';

import { UsuarioService } from 'src/app/services/usuario.service';
import { GoogleProfile } from 'src/app/models/google-profile';

@Component({
  selector: 'smk-header-toolbar',
  styleUrls: ['./header-toolbar.component.scss'],
  templateUrl: './header-toolbar.component.html'
})
export class HeaderToolbarComponent
  implements OnInit {

  constructor(
    private usuarioService: UsuarioService
  ) { }

  ngOnInit(): void { }

  onLogoutClick() {
    this.usuarioService.logoutUser();
  }

  get googleProfile(): GoogleProfile {
    return this.usuarioService.googleProfile;
  }

  get userImageProfile(): string {
    return this.usuarioService.googleProfile.photos[0]?.value ||
      '../../../../../assets/img/Grupo 10.svg';
  }
}
