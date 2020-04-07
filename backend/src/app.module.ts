
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

import { ApresentacaoModule } from './modules/apresentacao/apresentacao.module';
import { UsuarioModule } from './modules/usuario/usuario.module';
import { PlanoModule } from './modules/plano/plano.module';
import { AuthModule } from './modules/auth/auth.module';

import { AppController } from './app.controller';

import database from './config/database';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [database] }),

    TypeOrmModule.forRoot(database()),

    ServeStaticModule.forRoot({
      renderPath: '/',
      rootPath: `${__dirname}/public`
    }),

    ApresentacaoModule,
    PlanoModule,
    UsuarioModule,
    AuthModule
  ],
  controllers: [
    AppController
  ]
})
export class AppModule { } 
