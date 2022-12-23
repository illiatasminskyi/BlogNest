import { Posts } from 'src/posts/entity/posts.entity';
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

  @Column({ unique: true })
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

/*
CREATE TABLE IF NOT EXISTS public.tag
(
    id integer NOT NULL DEFAULT nextval('tag_id_seq'::regclass),
    title character varying COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "PK_8e4052373c579afc1471f526760" PRIMARY KEY (id),
    CONSTRAINT "UQ_ea660f2baf9c3f3141d7c2ef531" UNIQUE (title)
)
*/
