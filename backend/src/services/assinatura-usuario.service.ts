import { Injectable } from '@nestjs/common';

import { AssinaturaUsuarioRepository } from '../repository/assinatura-usuario.repository';
import { AssinaturaUsuario } from '../db/models/assinatura-usuario';
import { Transacao } from '../db/models/transacao';
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

    async criaAssinaturaPor(transacao: Transacao): Promise<any> {

        const idUsuario: number = await this.usuarioService
            .recuperaIdUsuarioPorGoogleId(transacao.usuario.googleId);

        transacao.usuario.id = idUsuario[0].id;

        const assinatura = <AssinaturaUsuario>{
            plano: transacao.plano,
            usuario: transacao.usuario,
            quantidadeApresentacoes: transacao.quantidadeApresentacoes
        };

        return this.assinaturaUsuarioRepository.criaAssinatura(assinatura);
    }

}
