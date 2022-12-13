import { Posts } from 'src/posts/posts.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Categories {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @OneToMany(() => Posts, (post) => post.category)
  posts: Posts[];
}
