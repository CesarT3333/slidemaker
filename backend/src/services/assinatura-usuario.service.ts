import { Injectable } from '@nestjs/common';

import { AssinaturaUsuarioRepository } from '../repository/assinatura-usuario.repository';
import { AssinaturaUsuario } from '../db/models/assinatura-usuario';
import { UsuarioService } from './usuario.service';
import Usuario from '../db/models/usuario';

@Injectable()
export class AssinaturaUsuarioService {

    constructor(
        private assinaturaUsuarioRepository: AssinaturaUsuarioRepository,
        private usuarioService: UsuarioService
    ) { }

    buscarTodos(): Promise<Array<AssinaturaUsuario>> {
        return this.assinaturaUsuarioRepository.buscarTodas();
    }

    async buscaAssinaturaUsuario(usuario: Usuario): Promise<AssinaturaUsuario> {
        return this.assinaturaUsuarioRepository.buscaAssinaturaUsuario(usuario);
    }

    async criaAssinatura(assinatura: AssinaturaUsuario): Promise<any> {

        const idUsuario: number = await this.usuarioService
            .recuperaIdUsuarioPorGoogleId(assinatura.usuario.googleId);

        assinatura.usuario.id = idUsuario[0].id;

        return this.assinaturaUsuarioRepository.criaAssinatura(assinatura);
    }

}
