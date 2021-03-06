import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

import { join } from 'path';

import { PresentationModule } from './modules/presentation/presentation.module';
import { DataSourceModule } from './modules/data-sources/data-source.module';
import { PaymentModule } from './modules/pyment/payment.module';
import { IdiomModule } from './modules/idiom/idiom.module';
import { ThemeModule } from './modules/theme/theme.module';
import { UserModule } from './modules/user/user.module';
import { PlanModule } from './modules/plan/plan.module';
import { AuthModule } from './modules/auth/auth.module';

import { PresentationProgressGateway } from '@services/presentation-progress.gateway';
import { ConfigurationModule } from './modules/configuration/configuration.module';
import { SubscriptionModule } from './modules/subscription/subscription.module';
import { CoverImageService } from '@services/cover-image.service';
import { CoverModule } from './modules/cover/cover.module';
import database from './config/database';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [database] }),

    TypeOrmModule.forRoot(database()),

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'src/public'),
    }),

    DataSourceModule,
    IdiomModule,
    CoverModule,

    ConfigurationModule,
    SubscriptionModule,
    PresentationModule,
    CoverImageService,
    PaymentModule,
    CoverModule,
    ThemeModule,
    UserModule,
    PlanModule,
    AuthModule,
  ],
  providers: [PresentationProgressGateway]
})
export class AppModule { }
