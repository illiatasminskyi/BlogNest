import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Welcome')
@Controller()
export class AppController {
  @Get()
  start() {
    return 'Welcome!';
  }
}
