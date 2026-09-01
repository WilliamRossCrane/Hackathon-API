import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AllowAnonymous, Roles, Session } from '@thallesp/nestjs-better-auth';
import type { UserSession } from '@thallesp/nestjs-better-auth';
import { ResponseMessage } from '../../common/decorators/response-message.decorator';
import {
  CreateHackathonDto,
  UpdateHackathonDto,
} from './dto/create-hackathon.dto';
import { HackathonService } from './hackathon.service';

@Controller('hackathon')
export class HackathonController {
  constructor(private readonly hackathonService: HackathonService) {}

  @Get()
  @AllowAnonymous()
  findAll() {
    return this.hackathonService.findAll();
  }

  @Get(':id')
  @AllowAnonymous()
  findById(@Param('id') id: string) {
    return this.hackathonService.findById(id);
  }

  @Post()
  @Roles(['ADMIN'])
  @ResponseMessage('Hackathon created')
  create(@Body() input: CreateHackathonDto, @Session() session: UserSession) {
    return this.hackathonService.create(input, session.user.id);
  }

  @Patch(':id')
  @Roles(['ADMIN'])
  @ResponseMessage('Hackathon updated')
  update(@Param('id') id: string, @Body() input: UpdateHackathonDto) {
    return this.hackathonService.update(id, input);
  }

  @Delete(':id')
  @Roles(['ADMIN'])
  @ResponseMessage('Hackathon deleted')
  remove(@Param('id') id: string) {
    return this.hackathonService.remove(id);
  }

  @Post(':id/join')
  @Roles(['PARTICIPANT'])
  @ResponseMessage('Joined hackathon')
  join(@Param('id') id: string, @Session() session: UserSession) {
    return this.hackathonService.join(id, session.user.id);
  }
}
