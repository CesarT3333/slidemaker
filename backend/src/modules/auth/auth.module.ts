import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

import { UsuarioModule } from '../usuario/usuario.module';
import { GoogleStrategy } from './google.strategy';
import { AuthController } from './auth.controller';
import { AuthService } from './oauth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  controllers: [AuthController],
  imports: [
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    UsuarioModule
  ],
  providers: [
    AuthService,
    GoogleStrategy,
    JwtStrategy
  ],
})
export class AuthModule { }