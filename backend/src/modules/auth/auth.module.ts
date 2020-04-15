import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

import { AuthService } from '../../services/auth.service';
import { GoogleStrategy } from './google.strategy';
import { AuthController } from './auth.controller';
import { UserModule } from '../usuario/user.module';
import { JwtStrategy } from './jwt.strategy';

@Module({
  controllers: [AuthController],
  imports: [
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    UserModule
  ],
  providers: [
    AuthService,
    GoogleStrategy,
    JwtStrategy
  ],
})
export class AuthModule { }
