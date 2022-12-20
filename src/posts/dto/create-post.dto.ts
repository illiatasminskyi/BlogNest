import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  status: string;
  // author: Users;

  @ApiProperty()
  category: any;

  @ApiProperty()
  tags: any;
}
