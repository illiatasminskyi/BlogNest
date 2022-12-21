import { Posts } from 'src/posts/posts.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { PostsAndTags } from './posts_tags.entity';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  // @ManyToOne(() => PostsAndTags, (tags) => tags.posts)
  // @JoinTable()
  // posts: PostsAndTags[];

  // @ManyToMany(() => Posts, (post) => post.tags)
  // posts: Posts[];

  @ManyToOne(() => Posts, (post) => post.tags)
  posts: Posts;
}
