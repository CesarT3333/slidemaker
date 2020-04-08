import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AssinaturaUsuarioService } from '../../services/assinatura-usuario.service';
import { resources } from '../../util/resources';
import Usuario from '../../db/models/usuario';

@Controller(resources.ASSINATURAS)
export class AssinaturaUsuarioController {

    constructor(
        private assinaturaUsuarioService: AssinaturaUsuarioService
    ) { }

    @Get(`usuario`)
    @UseGuards(AuthGuard('jwt'))
    buscaAssinaturaUsuario(@Req() request) {
        const usuario = <Usuario>{ googleId: request.user.profileId }
        return this.assinaturaUsuarioService.buscaAssinaturaUsuario(usuario)
    }


}
