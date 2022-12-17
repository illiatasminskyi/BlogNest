import { Tag } from 'src/tags/entities/tag.entity';
import { Users } from 'src/users/users.entity';

export class CreatePostDto {
  id: number;
  title: string;
  content: string;
  status: string;
  // author: Users;
  // category: Users;
  // tags: Tag[];
  // created_at: Date;
  // updated_at: Date;
}
