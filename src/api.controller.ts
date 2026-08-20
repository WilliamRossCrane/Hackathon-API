import { Controller, Get, UseGuards } from '@nestjs/common';
import { ArcjetGuard } from './common/guards/arcjet.guard';

@Controller('api')
@UseGuards(ArcjetGuard)
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
