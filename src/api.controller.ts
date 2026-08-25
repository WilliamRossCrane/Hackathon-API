import { Controller, Get } from '@nestjs/common';
import { AllowAnonymous } from '@thallesp/nestjs-better-auth';

@Controller('api')
export class ApiController {
  @Get('status')
  @AllowAnonymous()
  getStatus(): { status: string; ok: boolean; route: string } {
    return {
      status: 'ok',
      ok: true,
      route: '/api/status',
    };
  }
}
