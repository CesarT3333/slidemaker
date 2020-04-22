import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { UserService } from '../../services/user.service';
import { resources } from '../../util/resources';
import User from '../../db/models/user';

@UseGuards(AuthGuard('jwt'))
@Controller(resources.USERS)
export class UserController {

  constructor(
    private usuario: UserService,
  ) { }

  @Get()
  recuperaUsuarioLogado(googleId: string): Promise<User> {
    return this.usuario.getByGoogleId(googleId);
  }
}
