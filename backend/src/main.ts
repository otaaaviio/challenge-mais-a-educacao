import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { ErrorHandlerMiddleware } from './middlewares/error-handler.middleware';
import * as cookieParser from 'cookie-parser';

dotenv.config();

async function bootstrap() {
  const PORT = Number(process.env.PORT) || 3000;
  const HOST = process.env.HOST || 'localhost';
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());
  app.useGlobalFilters(new ErrorHandlerMiddleware());
  app.enableCors({
    origin: true,
    credentials: true,
  });

  await app.listen(PORT, () => {
    console.log(`Server is running on ${HOST}:${PORT}`);
  });
}
bootstrap();
