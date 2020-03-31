import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import * as jwt from '../credentials/secret-app.json';

export enum Provider {
    GOOGLE = 'google',
}

@Injectable()
export class AuthService {

    async validateOAuthLogin(thirdPartyId: string, provider: Provider): Promise<string> {
        try {
            console.log(jwt.secret_key)
            return sign({
                thirdPartyId,
                provider,
            }, jwt.secret_key, {
                expiresIn: 3600,
            });
        } catch (err) {
            throw new InternalServerErrorException('validateOAuthLogin', err.message);
        }
    }
}
