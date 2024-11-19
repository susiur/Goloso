import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
    methods: 'GET,POST,PATCH,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true, // Si usas cookies o autenticación, habilita esto
  });
  await app.listen(3000);
}
bootstrap();
