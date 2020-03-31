
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

import { ApresentacaoModule } from './apresentacao/apresentacao.module';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';

import database from './config/database';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [database] }),

    TypeOrmModule.forRoot(database()),

    ServeStaticModule.forRoot({
      rootPath: `${__dirname}/public`
    }),

    ApresentacaoModule,
    AuthModule
  ],
  controllers: [
    AppController
  ]
})
export class AppModule { } 
