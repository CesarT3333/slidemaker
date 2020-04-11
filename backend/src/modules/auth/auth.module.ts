import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

import { UsuarioModule } from '../usuario/usuario.module';
import { AuthService } from '../../services/auth.service';
import { GoogleStrategy } from './google.strategy';
import { AuthController } from './auth.controller';
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
