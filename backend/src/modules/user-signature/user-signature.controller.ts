import { Controller, Get, UseGuards, Req, Post } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { UserSignatureService } from 'src/services/user-signatureservice';
import { UserSignature } from '../../db/models/user-signature';
import { resources } from '../../util/resources';
import User from '../../db/models/user';

@Controller(resources.ASSINATURAS)
export class UserSignatureController {

  constructor(
    private userSignatureService: UserSignatureService
  ) { }

  @Get(`usuario`)
  @UseGuards(AuthGuard('jwt'))
  getForLoggedInUser(@Req() request) {
    const usuario = <User>{ googleId: request.user.profileId }
    return this.userSignatureService.getForLoggedInUser(usuario)
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async registraTransacao(@Req() request) {
    const signature: UserSignature = request.body;
    signature.usuario = <User>{ googleId: request.user.profileId }

    await this.userSignatureService
      .create(<UserSignature>request.body);

  }


}
