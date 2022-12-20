import { Controller, Get, UseGuards, HttpStatus, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

@ApiTags('Welcome')
@Controller()
export class AppController {
  @Get()
  start() {
    return 'Welcome!';
  }
}
