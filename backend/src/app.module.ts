import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

import { join } from 'path';

import { AuthModule } from './modules/auth/auth.module';

import { AppController } from './app.controller';

import { UserSignatureModule } from './modules/user-signature/user-signature.module';
import { PresentationModule } from './modules/presentation/presentation.module';
import { UserModule } from './modules/usuario/user.module';
import { PlanModule } from './modules/plan/plan.module';
import database from './config/database';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [database] }),

    TypeOrmModule.forRoot(database()),

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'src/public'),
    }),

    UserSignatureModule,
    PresentationModule,
    UserModule,
    PlanModule,
    AuthModule,

  ],
  controllers: [
    AppController
  ]
})
export class AppModule { }
