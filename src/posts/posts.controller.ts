import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-tag.dto';
import { PostsService } from './posts.service';
import { Categories } from 'src/category/categories.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Post('/create')
  async create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.postsService.findOne(id);
  }

  @Get(':title')
  findOneTitle(@Param('title') title: string) {
    console.log(title);
    return this.postsService.findOneTitle(title);
  }

  // @Patch(':id')
  // async update(@Param('id') id: number, @Body() updatePostDto: UpdatePostDto) {
  //   return this.postsService.update(id, updatePostDto);
  // }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.postsService.remove(id);
  }
}
