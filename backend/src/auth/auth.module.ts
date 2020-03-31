import { PassportModule } from '@nestjs/passport';
import { Module } from '@nestjs/common';

import { GoogleStrategy } from './google.strategy';
import { AuthController } from './auth.controller';
import { AuthService } from './oauth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  controllers: [AuthController],
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [
    AuthService,
    GoogleStrategy,
    JwtStrategy
  ],
})
export class AuthModule { }