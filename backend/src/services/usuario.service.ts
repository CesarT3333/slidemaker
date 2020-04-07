import { Injectable } from '@nestjs/common';

import { UserGooglePayload } from '../interfaces/user-google-pay-load';
import { UsuarioRepository } from '../usuario/usuario.repository';
import Usuario from '../db/models/usuario';

@Injectable()
export class UsuarioService {

    constructor(
        private usuarioRepository: UsuarioRepository
    ) { }

    // async findAll(): Promise<Usuario[]> {
    //     return this.usuarioRepository.find();
    // }

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

    private async usuarioNaoPossuiCadastro(idGoogle: string) {
        const quantidadeUsuariosComEsseId = await this.usuarioRepository
            .buscaUsuarioPorIdGoogle(idGoogle);
        console.log(Number(quantidadeUsuariosComEsseId[0].count));
        return Number(quantidadeUsuariosComEsseId[0].count) === 0;
    }

}