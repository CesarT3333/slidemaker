import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import dotenvFlow = require('dotenv-flow');

import "reflect-metadata";

async function bootstrap() {
  dotenvFlow.config();
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type, Accept",
  });
  // app.setGlobalPrefix('slidemaker/api');
  await app.listen(4200);
}

bootstrap();
