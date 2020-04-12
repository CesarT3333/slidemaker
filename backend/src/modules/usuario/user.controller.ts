import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { UserService } from 'src/services/user.service';
import { resources } from '../../util/resources';
import User from '../../db/models/user';

@Controller(resources.USERS)
export class UserController {

  constructor(
    private usuario: UserService,
  ) { }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  recuperaUsuarioLogado(googleId: string): Promise<User> {
    return this.usuario.getByGoogleId(googleId)
  }
}
