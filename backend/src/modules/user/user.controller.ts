import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { UserService } from '@services/user.service';
import { resources } from '../../util/resources';
import User from '@model/user';

@UseGuards(AuthGuard('jwt'))
@Controller(resources.USERS)
export class UserController {

  constructor(
    private user: UserService,
  ) { }

  @Get()
  recoverUserLogged(googleId: string): Promise<User> {
    return this.user.getByGoogleId(googleId);
  }
}
