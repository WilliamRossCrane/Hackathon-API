import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { ArcjetGuard, ArcjetModule, shield, tokenBucket } from '@arcjet/nest';
import { ApiController } from './api.controller';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ArcjetModule.forRoot({
      isGlobal: true,
      key: process.env.ARCJET_KEY!,
      rules: [
        shield({ mode: 'LIVE' }),
        tokenBucket({
          mode: 'LIVE',
          refillRate: 10,
          interval: 60,
          capacity: 30,
        }),
      ],
    }),
  ],
  controllers: [AppController, ApiController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ArcjetGuard,
    },
  ],
})
export class AppModule {}
