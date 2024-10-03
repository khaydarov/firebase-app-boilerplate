import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { initializeFirebaseApp } from '../../infrastructure/firebase';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['verbose', 'log', 'debug', 'warn', 'error'],
  });

  const config = app.get(ConfigService);
  initializeFirebaseApp(config);

  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
