import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { ArcjetGuard, ArcjetModule, fixedWindow, shield } from '@arcjet/nest';
import { ApiController } from './api.controller';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './lib/database/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    ArcjetModule.forRoot({
      isGlobal: true,
      key: process.env.ARCJET_KEY!,
      rules: [
        shield({ mode: 'LIVE' }),
        fixedWindow({
          mode: 'LIVE',
          window: '60s',
          max: 30,
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
