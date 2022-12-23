import { Posts } from 'src/posts/entity/posts.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Categories {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  title: string;

  @OneToMany(() => Posts, (post) => post.category, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  posts: Posts[];
}
/*
CREATE TABLE IF NOT EXISTS public.categories
(
    id integer NOT NULL DEFAULT nextval('categories_id_seq'::regclass),
    title character varying COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY (id),
    CONSTRAINT "UQ_aa79448dc3e959720ab4c13651d" UNIQUE (title)
)
*/
