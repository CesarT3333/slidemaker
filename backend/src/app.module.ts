import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

import { join } from 'path';

import { AuthModule } from './modules/auth/auth.module';

import { AppController } from './app.controller';

import { AssinaturaUsuarioModule } from './modules/assinatura/assinatura-usuario.module';
import { PresentationModule } from './modules/presentation/presentation.module';
import { TransacaoModule } from './modules/transacao/transacao.module';
import { PlanModule } from './modules/plan/plan.module';
import database from './config/database';
import { UserModule } from './modules/usuario/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [database] }),

    TypeOrmModule.forRoot(database()),

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'src/public'),
    }),

    PresentationModule,
    UserModule,
    PlanModule,
    AuthModule,

    AssinaturaUsuarioModule,
    TransacaoModule,
  ],
  controllers: [
    AppController
  ]
})
export class AppModule { }
