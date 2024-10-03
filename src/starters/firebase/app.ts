import { NestFactory } from '@nestjs/core';
import {
  ExpressAdapter,
  NestExpressApplication,
} from '@nestjs/platform-express';
import * as express from 'express';

import { onRequest } from 'firebase-functions/v2/https';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as compression from 'compression';
import { ConfigService } from '@nestjs/config';
import { initializeFirebaseApp } from '../../infrastructure/firebase';

const expressServer = express();

const apiFunction = async (expressInstance: express.Express): Promise<void> => {
  const api = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(expressInstance),
  );

  const config = api.get(ConfigService);
  initializeFirebaseApp(config);

  api.use(compression());
  api.useGlobalPipes(new ValidationPipe({ transform: true }));
  api.enableCors({});

  await api.init();
};

// Export a Firebase function that initializes the API function and then passes the request and response to the express server
export const api = onRequest(async (request, response) => {
  await apiFunction(expressServer);
  expressServer(request, response);
});
