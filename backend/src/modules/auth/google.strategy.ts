import { PassportStrategy } from "@nestjs/passport";
import { ConfigService } from '@nestjs/config';
import { Injectable } from "@nestjs/common";

import { Strategy } from 'passport-google-oauth20';

import { UserGooglePayload } from '../../interfaces/user-google-pay-load';
import { AuthService, Provider } from '../../services/auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {

  constructor(
    private readonly auth: AuthService,
    private readonly configService: ConfigService
  ) {
    super({
      clientID: `${configService.get<string>('GOOGLE_CLIENT_ID')}`,
      clientSecret: `${configService.get<string>('GOOGLE_CLIENT_SECRET')}`,
      callbackURL: `${configService.get<string>('GOOGLE_URL_CALLBACK')}`,
      passReqToCallback: true,
      scope: ['profile', 'email'],
    });
  }

  async validate(request: any, accessToken: string, refreshToken: string, profile: UserGooglePayload, done: any) {
    try {
      const jwt: string = await this.auth.validateOAuthLogin(profile, Provider.GOOGLE);

      const user = { jwt, profile };
      done(null, user);
    } catch (err) {
      done(err, false);
    }
  }

}
