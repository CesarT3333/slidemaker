import { Injectable } from '@nestjs/common';

import { UserGooglePayload } from '../interfaces/user-google-pay-load';
import { UsuarioRepository } from '../repository/usuario.repository';
import Usuario from '../db/models/usuario';

@Injectable()
export class UsuarioService {

    constructor(
        private usuarioRepository: UsuarioRepository
    ) { }

    async criaUsuarioPorPayloadGoogle(profile: UserGooglePayload): Promise<any> {

        if (await this.usuarioNaoPossuiCadastro(profile.id)) {
            const usuario: Usuario = {
                googleId: profile.id,
                email: profile.emails[0].value,
                nome: profile.name.givenName,
                sobreNome: profile.name.familyName,
                createdAt: new Date()
            }
            return this.usuarioRepository.criaUsuario(usuario);
        }

    }

    async recuperaIdUsuarioPorGoogleId(googleId: string): Promise<number> {
        return await this.usuarioRepository
            .recuperaIdUsuarioPorGoogleId(googleId);
    }

    private async usuarioNaoPossuiCadastro(idGoogle: string): Promise<boolean> {
        const quantidadeUsuariosComEsseId = await this.usuarioRepository
            .buscaUsuarioPorIdGoogle(idGoogle);
        return Number(quantidadeUsuariosComEsseId[0].count) === 0;
    }

}
