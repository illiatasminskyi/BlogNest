import { ApiProperty } from '@nestjs/swagger';
import { Status } from '../status.enum';

export class UpdatePostDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  category: string;

  updated_at: Date;

  @ApiProperty({
    enum: Status,
    default: Status.Draft,
  })
  status: Status;
}
