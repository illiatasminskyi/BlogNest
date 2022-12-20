import {
  Controller,
  Get,
  HttpStatus,
  Req,
  Session,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { AuthService } from './auth.service';
import {
  AuthenticatedGuard,
  FacebookAuthGuard,
  LoginGuard,
} from './utils/authenticated.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private usersService: AuthService) {}

  @Get('/facebook')
  @UseGuards(AuthGuard('facebook'))
  // @UseGuards(LoginGuard)
  async facebookLogin(): Promise<any> {
    return HttpStatus.OK;
  }

  @Get('/facebook/redirect')
  // @UseGuards(AuthGuard('facebook'))
  @UseGuards(LoginGuard)
  async facebookLoginRedirect(@Req() req: Request): Promise<any> {
    const data = await req.user;
    return data;
  }

  @Get('')
  getAuthSession(@Session() session: Record<string, any>) {
    console.log(session);
    console.log(session.id);
    session.authenticated = true;
    return session;
  }

  @Get('/status')
  @UseGuards(AuthenticatedGuard)
  status(@Req() req: Request) {
    return req.user;
  }
}
