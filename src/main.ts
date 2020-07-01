import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import packageJson from '../package.json';

import { AppModule } from './core/app';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      logger: true,
      ignoreTrailingSlash: true,
      caseSensitive: false,
    })
  );

  app.enableCors({
    origin: '*',
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    })
  );

  const options = new DocumentBuilder()
    .setTitle(packageJson.description)
    .setDescription('Swagger API Documentation')
    .setVersion(packageJson.version)
    .addBasicAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('$wagger', app, document);

  await app.listen(Number(process.env.SERVICE_PORT), '0.0.0.0');
}

bootstrap();
