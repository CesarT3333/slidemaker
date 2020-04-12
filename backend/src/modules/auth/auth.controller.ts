import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { resources } from '../../util/resources';
import User from '../../db/models/user';

@Controller(resources.AUTH)
export class AuthController {

  constructor(
    private oauthService: AuthService,
    private userService: UserService,
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
    const usuario = <User>{ googleId: request.user.profileId }
    await this.userService.recuperaIdUsuarioPorGoogleId(usuario.googleId)
  }

}
