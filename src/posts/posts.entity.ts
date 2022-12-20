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
  OneToMany,
} from 'typeorm';

@Entity()
export class Posts {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  status: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @ManyToOne(() => Users, (user) => user.posts)
  author: Users;

  @ManyToOne(() => Categories, (category) => category.posts)
  category: Categories;

  @ManyToMany(() => Tag, (tag) => tag.posts)
  @JoinTable()
  tags: Tag[];

  // @ManyToMany(() => Tag, (tag) => tag.posts)
  // @JoinTable()
  // tags: Promise<Tag[]>;
}
