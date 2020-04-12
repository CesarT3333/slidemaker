import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

import { join } from 'path';

import { UsuarioModule } from './modules/usuario/usuario.module';
import { AuthModule } from './modules/auth/auth.module';

import { AppController } from './app.controller';

import { AssinaturaUsuarioModule } from './modules/assinatura/assinatura-usuario.module';
import { PresentationModule } from './modules/presentation/presentation.module';
import { TransacaoModule } from './modules/transacao/transacao.module';
import { PlanModule } from './modules/plan/plan.module';
import database from './config/database';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [database] }),

    TypeOrmModule.forRoot(database()),

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'src/public'),
    }),

    PresentationModule,

    AssinaturaUsuarioModule,
    TransacaoModule,
    UsuarioModule,
    PlanModule,
    AuthModule
  ],
  controllers: [
    AppController
  ]
})
export class AppModule { }
