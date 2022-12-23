import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categories } from 'src/category/entity/categories.entity';
import { Tag } from 'src/tags/entities/tag.entity';
import { Users } from 'src/users/entity/users.entity';
import { Posts } from './entity/posts.entity';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

@Module({
  imports: [TypeOrmModule.forFeature([Posts, Users, Categories, Tag])],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
