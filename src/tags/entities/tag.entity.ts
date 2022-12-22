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

  @ManyToMany(() => Posts, {
    cascade: true,
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinTable({
    name: 'posts_tags',
    joinColumn: {
      name: 'tagsId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'postsId',
      referencedColumnName: 'id',
    },
  })
  posts: Posts[];
}
