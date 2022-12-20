import {
  Controller,
  Get,
  HttpStatus,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { UsersService } from './users.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('')
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.usersService.findOne(id);
  }
}
