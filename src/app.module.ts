import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ApiController } from './api.controller';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArcjetModule } from './lib/arcjet/arcjet.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), ArcjetModule],
  controllers: [AppController, ApiController],
  providers: [AppService],
})
export class AppModule {}
