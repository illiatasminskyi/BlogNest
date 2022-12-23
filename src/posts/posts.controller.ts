import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { AuthenticatedGuard } from 'src/auth/utils/authenticated.guard';
import { Role } from 'src/roles/role.enum';
import { Roles } from 'src/roles/roles.decorator';
import { Users } from 'src/users/entity/users.entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-tag.dto';
import { PostsService } from './posts.service';

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
    return this.postsService.create(createPostDto, req).catch((err) => {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    });
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
    return this.postsService.update(id, updatePostDto, req).catch((err) => {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    });
  }

  @Roles(Role.Admin)
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.postsService.remove(id).catch((err) => {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    });
  }
}
