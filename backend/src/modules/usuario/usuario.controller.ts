import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { UsuarioService } from 'src/services/usuario.service';
import { resources } from '../../util/resources';
import Usuario from 'src/db/models/usuario';

@Controller(resources.USUARIOS)
export class UsuarioController {

    constructor(
        private usuarioService: UsuarioService,
    ) { }

    @Get()
    @UseGuards(AuthGuard('jwt'))
    recuperaUsuarioLogado(googleId: string): Promise<Usuario> {
        return this.usuarioService.recuperaUsuarioPorGoogleId(googleId)
    }
}