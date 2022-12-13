import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Inject,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { CreateUserDto } from './users.dto';
import { Users } from './users.entity';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
  @Inject(UsersService)
  private readonly service: UsersService;

  @Get('/facebook')
  @UseGuards(AuthGuard('facebook'))
  async facebookLogin(): Promise<any> {
    return HttpStatus.OK;
  }

  @Get('/facebook/redirect')
  @UseGuards(AuthGuard('facebook'))
  async facebookLoginRedirect(@Req() req: Request): Promise<any> {
    return {
      data: req.user,
    };
  }

  @Post('/user')
  public createUser(@Body() Body: CreateUserDto): Promise<Users> {
    return this.service.createUser(Body);
  }
}
