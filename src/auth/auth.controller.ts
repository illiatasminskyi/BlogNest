import {
  Controller,
  Get,
  HttpStatus,
  Req,
  Session,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { AuthenticatedGuard, LoginGuard } from './utils/authenticated.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private usersService: AuthService) {}

  @Get('/facebook')
  @UseGuards(AuthGuard('facebook'))
  async facebookLogin(): Promise<any> {
    return HttpStatus.OK;
  }

  @Get('/facebook/redirect')
  @UseGuards(LoginGuard)
  async facebookLoginRedirect(@Req() req: Request): Promise<any> {
    const data = await req.user;
    return data;
  }

  @Get()
  getAuthSession(@Session() session: Record<string, any>) {
    session.authenticated = true;
    return session;
  }

  @Get('/status')
  @UseGuards(AuthenticatedGuard)
  status(@Req() req: Request) {
    return req.user;
  }
}
