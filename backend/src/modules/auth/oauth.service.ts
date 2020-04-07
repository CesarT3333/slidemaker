import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { sign } from 'jsonwebtoken';

import * as jwt from '../../credentials/secret-app.json';
import { UserGooglePayload } from 'src/interfaces/user-google-pay-load';
import { UsuarioService } from '../../services/usuario.service';

export enum Provider { GOOGLE = 'google' }

@Injectable()
export class AuthService {

    constructor(
        private readonly usuarioService: UsuarioService
    ) { }

    async validateOAuthLogin(profile: UserGooglePayload, provider: Provider): Promise<string> {
        try {

            const profileId: string = profile.id;
            this.usuarioService.criaUsuarioPorPayloadGoogle(profile);

            return sign(
                {
                    profileId,
                    provider,
                },
                jwt.secret_key, {
                expiresIn: 3600,
            });

        } catch (err) {
            throw new InternalServerErrorException('validateOAuthLogin', err.message);
        }
    }
}
