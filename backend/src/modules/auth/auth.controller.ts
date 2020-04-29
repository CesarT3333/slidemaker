import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from '@services/auth.service';
import { UserService } from '@services/user.service';
import { resources } from '../../util/resources';
import User from '@model/user';

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
    const user = <User>{ googleId: request.user.profileId };
    await this.userService.getIdByGoogleId(user.googleId);
  }

}
