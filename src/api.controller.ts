import { Controller, Get } from '@nestjs/common';

@Controller('api')
export class ApiController {
  @Get('status')
  getStatus(): { status: string; ok: boolean; route: string } {
    return {
      status: 'ok',
      ok: true,
      route: '/api/status',
    };
  }
}
