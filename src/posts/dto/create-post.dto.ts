import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  status: string;

  @ApiProperty()
  category: any;

  // @ApiProperty()
  // author: any;

  @ApiProperty()
  tags: any;
}
