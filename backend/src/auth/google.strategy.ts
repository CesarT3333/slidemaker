import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";

import { Strategy } from 'passport-google-oauth20';

import { AuthService, Provider } from './oauth.service';

import * as googleCredentials from '../credentials/google-credentials.json';

const credentialsGoogle = {
    clientID: googleCredentials.clientID,
    clientSecret: googleCredentials.clientSecret,
    callbackURL: 'http://localhost:4200/auth/google/callback',
    passReqToCallback: true,
    scope: ['profile'],
};

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {

    constructor(
        private readonly auth: AuthService
    ) { super(credentialsGoogle); }

    async validate(request: any, accessToken: string, refreshToken: string, profile, done: any) {
        try {
            const jwt: string = await this.auth.validateOAuthLogin(profile.id, Provider.GOOGLE);
            const user = { jwt };
            done(null, user);
        } catch (err) {
            done(err, false);
        }
    }

}
