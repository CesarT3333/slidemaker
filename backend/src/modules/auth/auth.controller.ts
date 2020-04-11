import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { UsuarioService } from '../../services/usuario.service';
import { AuthService } from '../../services/auth.service';
import { resources } from '../../util/resources';
import Usuario from '../../db/models/usuario';

@Controller(resources.AUTH)
export class AuthController {

  constructor(
    private usuarioService: UsuarioService,
    private oauthService: AuthService,
  ) { }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleLogin() { }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleLoginCallback(@Req() req): string {
    return this.oauthService.processGoogleCallBack(req);
  }

  @Get('usuario-logado')
  @UseGuards(AuthGuard('jwt'))
  async usuarioEstaLogado(@Req() request): Promise<void> {
    const usuario = <Usuario>{ googleId: request.user.profileId }
    await this.usuarioService.recuperaIdUsuarioPorGoogleId(usuario.googleId)
  }

}
