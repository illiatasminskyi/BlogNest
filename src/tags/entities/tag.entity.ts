import { Posts } from 'src/posts/posts.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToMany(() => Posts, (post) => post.tags)
  @JoinTable()
  posts: Posts[];

  // @ManyToMany(() => Posts, (post) => post.tags)
  // @JoinTable()
  // posts: Promise<Posts[]>;
}
