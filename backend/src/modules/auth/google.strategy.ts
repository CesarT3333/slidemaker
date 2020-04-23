import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

import { Strategy } from 'passport-google-oauth20';

import { UserGooglePayload } from '../../interfaces/user-google-pay-load';
import { Provider, AuthService } from '@services/auth.service';
import { scopes } from '../../util/google.constants';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {

  constructor(
    private auth: AuthService,
    private configService: ConfigService
  ) {
    super({
      clientID: `${configService.get<string>('GOOGLE_CLIENT_ID')}`,
      clientSecret: `${configService.get<string>('GOOGLE_CLIENT_SECRET')}`,
      callbackURL: `${configService.get<string>('GOOGLE_URL_CALLBACK')}`,
      passReqToCallback: true,
      scope: scopes,
    });
  }

  async validate(request: any, accessToken: string, refreshToken: string, profile: UserGooglePayload, done: any) {
    try {

      const jwt: string = await this.auth.validateOAuthLogin(profile, Provider.GOOGLE);

      const user = { jwt, profile, accessToken };
      done(null, user);
    } catch (err) {
      done(err, false);
    }
  }

}
