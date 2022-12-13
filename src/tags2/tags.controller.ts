import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/users/users.dto';
import { TagsService } from './tags.service';

@Controller('tags')
export class TagsController {
  constructor(private readonly usersService: TagsService) {}

  // @Post()
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.usersService.create(createUserDto);
  // }
}
