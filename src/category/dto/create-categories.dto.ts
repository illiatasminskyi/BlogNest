import { ApiProperty } from '@nestjs/swagger';
export class CreateCategoriesDto {
  @ApiProperty()
  title: string;
}
