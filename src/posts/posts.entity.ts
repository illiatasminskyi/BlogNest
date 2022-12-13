import { Categories } from 'src/category/categories.entity';
import { Tag } from 'src/tags/entities/tag.entity';

import { Users } from 'src/users/users.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinTable,
  ManyToMany,
} from 'typeorm';

@Entity()
export class Posts {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  status: string;

  @ManyToOne(() => Users, (user) => user.posts)
  author: Users;

  @ManyToOne(() => Categories, (category) => category.posts)
  category: Users;

  @ManyToMany(() => Tag)
  @JoinTable()
  categories: Tag[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
