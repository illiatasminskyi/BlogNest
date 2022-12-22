import { ApiProperty } from '@nestjs/swagger';

export class CreateTagDto {
  // id: number;

  @ApiProperty()
  title: string;
}
