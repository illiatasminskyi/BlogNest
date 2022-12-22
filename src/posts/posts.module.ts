import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsController } from './posts.controller';
import { Posts } from './posts.entity';
import { PostsService } from './posts.service';
import { Users } from 'src/users/users.entity';
import { Categories } from 'src/category/categories.entity';
import { Tag } from 'src/tags/entities/tag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Posts, Users, Categories, Tag])],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
