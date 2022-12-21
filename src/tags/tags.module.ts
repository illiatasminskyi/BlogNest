import { Module } from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from './entities/tag.entity';
import { PostsAndTags } from './entities/posts_tags.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tag, PostsAndTags])],
  providers: [TagsService],
  controllers: [TagsController],
})
export class TagsModule {}
