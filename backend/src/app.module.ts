import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

import { join } from 'path';

import { PresentationModule } from './modules/presentation/presentation.module';
import { DataSourceModule } from './modules/data-sources/data-source.module';
import { IdiomModule } from './modules/idiom/idiom.module';
import { ThemeModule } from './modules/theme/theme.module';
import { UserModule } from './modules/user/user.module';
import { PlanModule } from './modules/plan/plan.module';
import { AuthModule } from './modules/auth/auth.module';

import database from './config/database';
import { SubscriptionModule } from './modules/subscription/subscription.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [database] }),

    TypeOrmModule.forRoot(database()),

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'src/public'),
    }),

    DataSourceModule,
    IdiomModule,

    SubscriptionModule,
    PresentationModule,
    ThemeModule,
    UserModule,
    PlanModule,
    AuthModule,
  ]
})
export class AppModule { }
