import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: false,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      exceptionFactory: (errors: ValidationError[]) =>
        new BadRequestException(
          errors.flatMap(({ property, constraints }) =>
            Object.values(constraints ?? {}).map((message) => ({
              property,
              message,
            })),
          ),
        ),
    }),
  );
  app.useGlobalInterceptors(app.get(TransformInterceptor));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
