import { Posts } from 'src/posts/posts.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { Tag } from './tag.entity';

@Entity('posts_tags')
export class PostsAndTags {
  @PrimaryGeneratedColumn()
  id: number;

  // @PrimaryColumn('int') postId: number;

  // @PrimaryColumn('int') tagId: number;

  @OneToOne(() => Tag)
  @JoinColumn()
  tags: Tag;

  @OneToOne(() => Posts)
  @JoinColumn()
  posts: Posts;

  // @ManyToMany(() => Posts, (post) => post.tags)
  // @JoinTable()
  // posts: Promise<Posts[]>;
}
