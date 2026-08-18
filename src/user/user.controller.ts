import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Query,
  Param,
  BadRequestException,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import { RoleGuard } from '../guards/role.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUsers(@Query('name') name: string) {
    return this.userService.findAllUsers(name);
  }

  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOneUser(id);
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Put(':id')
  updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const parsed = parseInt(id, 10);
    if (Number.isNaN(parsed)) {
      throw new BadRequestException('Invalid id');
    }

    return this.userService.updateUser(parsed, updateUserDto);
  }

  // DELETE /user/1 -> 401 -> ROLE: ADMIN -> GO THROUGH
  @Delete(':id')
  @UseGuards(RoleGuard)
  deleteUser(@Param('id') id: string) {
    const parsed = parseInt(id, 10);
    if (Number.isNaN(parsed)) {
      throw new BadRequestException('Invalid id');
    }

    return this.userService.deleteUser(parsed);
  }
}
