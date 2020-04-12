import { Controller, Get, UseGuards, Req, Post } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AssinaturaUsuarioService } from '../../services/assinatura-usuario.service';
import { AssinaturaUsuario } from '../../db/models/assinatura-usuario';
import { resources } from '../../util/resources';
import User from '../../db/models/user';

@Controller(resources.ASSINATURAS)
export class AssinaturaUsuarioController {

  constructor(
    private assinaturaUsuarioService: AssinaturaUsuarioService
  ) { }

  @Get(`usuario`)
  @UseGuards(AuthGuard('jwt'))
  buscaAssinaturaUsuario(@Req() request) {
    const usuario = <User>{ googleId: request.user.profileId }
    return this.assinaturaUsuarioService.buscaAssinaturaUsuario(usuario)
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async registraTransacao(@Req() request) {
    const assinatura: AssinaturaUsuario = request.body;
    assinatura.usuario = <User>{ googleId: request.user.profileId }

    await this.assinaturaUsuarioService
      .criaAssinatura(<AssinaturaUsuario>request.body);

  }


}
