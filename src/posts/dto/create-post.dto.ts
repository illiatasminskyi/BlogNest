import { ApiProperty } from '@nestjs/swagger';
import { Categories } from 'src/category/categories.entity';
import { Posts } from 'src/posts/posts.entity';
import { Tag } from 'src/tags/entities/tag.entity';

export class CreatePostDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  status: string;

  @ApiProperty()
  category: string;

  @ApiProperty()
  tags: [];
}
