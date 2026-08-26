import { Controller, Get } from '@nestjs/common';
import { AllowAnonymous } from '@thallesp/nestjs-better-auth';
import { AppService } from './app.service';
import { ResponseMessage } from './common/decorators/response-message.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @AllowAnonymous()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('health')
  @AllowAnonymous()
  @ResponseMessage('Service is healthy')
  getHealth(): { status: string; ok: boolean; service: string } {
    return { status: 'ok', ok: true, service: 'hackathon-api' };
  }
}
