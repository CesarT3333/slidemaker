import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import dotenvFlow = require('dotenv-flow');

import "reflect-metadata";

async function bootstrap() {
  dotenvFlow.config();
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('slidemaker/api/v1');

  await app.listen(4200);
}

bootstrap();


class FrontAppicationModule {}
