import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './filters/HttpExceptionFilter ';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // const allowedOrigins = [
  //   'http://kupibush.nomorepartiessbs.ru',
  //   'https://kupibush.nomorepartiessbs.ru',
  //   'http://localhost:8081',
  //   'http://kupipodariday-frontend:80/',
  // ];
  // app.enableCors({
  //   origin: (origin, callback) => {
  //     if (!origin || allowedOrigins.includes(origin)) {
  //       callback(null, true);
  //     } else {
  //       callback(null, true); // Временно разрешаем все для отладки
  //     }
  //   },
  //   credentials: true,
  // });
  app.enableCors({
    origin: [
      'http://svyat-kpd.nomorepartiessbs.ru',
      'https://svyat-kpd.nomorepartiessbs.ru',
      'http://localhost:3000',
      'http://localhost:8081',
    ],
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(3001);
}
bootstrap();
