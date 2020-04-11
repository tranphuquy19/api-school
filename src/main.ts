import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { json } from 'body-parser';
import { APP_LOGGER } from '../logger/index';
import * as dotenv from 'dotenv';
import * as express from 'express';
import { NestExpressApplication } from '@nestjs/platform-express';
import 'reflect-metadata';
dotenv.config();
async function bootstrap() {
  try {
    APP_LOGGER.info(`School api is starting...`);
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    const PORT = process.env.PORT || 3000;
    app.use(json({ limit: '100mb' }));
    app.use(express.static('uploads'));
    app.useGlobalPipes(new ValidationPipe());
    await app.enableCors();
    /******************* SWAGGER  ************************/
    const options = new DocumentBuilder()
    .setTitle('SchoolApi')
    .setDescription('API School')
    .setVersion('1.0')
    .setBasePath('api/v1/')
    .build()
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('doc', app, document);
    APP_LOGGER.info('Initializing SchoolApi application resources...');
    /***********************************************************/
    await app.listen(PORT, () => {
      APP_LOGGER.info(`SchoolApi is running in port ${PORT}`)
    });
  } catch (e) {
    APP_LOGGER.error('Error initializing SchoolApi', e);
  }
}
bootstrap();
