import { Posts } from 'src/posts/entity/posts.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Categories {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @OneToMany(() => Posts, (post) => post.category, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  posts: Posts[];
}
