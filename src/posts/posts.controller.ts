import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Req,
  Session,
  UseGuards,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-tag.dto';
import { PostsService } from './posts.service';
import { Categories } from 'src/category/categories.entity';
import { ApiTags } from '@nestjs/swagger';
import { AuthenticatedGuard } from 'src/auth/utils/authenticated.guard';
import { Request } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/users/users.entity';
import { Repository } from 'typeorm';
import { Role } from 'src/roles/role.enum';
import { Roles } from 'src/roles/roles.decorator';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(
    private postsService: PostsService,
    @InjectRepository(Users) private readonly repoUsers: Repository<Users>,
  ) {}

  @Roles(Role.Admin, Role.Manager)
  @Post('/create')
  @UseGuards(AuthenticatedGuard)
  async create(@Body() createPostDto: CreatePostDto, @Req() req: Request) {
    return this.postsService.create(createPostDto, req);
  }

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get('search/title/:title')
  findTitle(@Param('title') title: string) {
    return this.postsService.findTitle(title);
  }

  @Get('search/content/:content')
  findContent(@Param('content') content: string) {
    return this.postsService.findContent(content);
  }

  @Get('search/catrgory/:catrgory')
  findCatrgory(@Param('catrgory') catrgory: string) {
    return this.postsService.findCatrgory(catrgory);
  }

  @Get('search/tags/:tags')
  findTags(@Param('tags') tags: string) {
    return this.postsService.findTags(tags);
  }

  @Roles(Role.Manager, Role.Admin)
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updatePostDto: UpdatePostDto,
    @Req() req: Request,
  ) {
    return this.postsService.update(id, updatePostDto, req);
  }

  @Roles(Role.Admin)
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.postsService.remove(id);
  }
}
