import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './modules/appModules';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.enableCors({
    allowedHeaders: '*',
    origin: '*',
  });

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3090, () =>
    console.log(`🤖 server running on port 3090...`),
  );
}

bootstrap();
