import { ApiProperty } from '@nestjs/swagger';

export class CreateTagDto {
  // @ApiProperty()
  // id: number;

  @ApiProperty()
  title: string;
}
