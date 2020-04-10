import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

import { join } from 'path';

import { ApresentacaoModule } from './modules/apresentacao/apresentacao.module';
import { UsuarioModule } from './modules/usuario/usuario.module';
import { PlanoModule } from './modules/plano/plano.module';
import { AuthModule } from './modules/auth/auth.module';

import { AppController } from './app.controller';

import database from './config/database';
import { AssinaturaUsuarioModule } from './modules/assinatura/assinatura-usuario.module';
import { TransacaoModule } from './modules/transacao/transacao.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [database] }),

    TypeOrmModule.forRoot(database()),

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'src/public'),
    }),

    AssinaturaUsuarioModule,
    ApresentacaoModule,
    TransacaoModule,
    UsuarioModule,
    PlanoModule,
    AuthModule
  ],
  controllers: [
    AppController
  ]
})
export class AppModule { } 
