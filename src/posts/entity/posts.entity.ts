import { Categories } from 'src/category/entity/categories.entity';
import { Tag } from 'src/tags/entities/tag.entity';
import { Users } from 'src/users/entity/users.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Status } from '../status.enum';

@Entity()
export class Posts {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  title: string;

  @Column()
  content: string;

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.New,
  })
  status: Status;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @ManyToOne(() => Users, (author) => author.posts)
  author: any;

  @ManyToOne(() => Categories, (category) => category.posts)
  category: Categories | string;

  @ManyToMany(() => Tag, {
    cascade: true,
    onDelete: 'NO ACTION',
    onUpdate: 'CASCADE',
  })
  @JoinTable({
    name: 'posts_tags',
    joinColumn: {
      name: 'postsId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'tagsId',
      referencedColumnName: 'id',
    },
  })
  tags: Tag[];
}
/*
CREATE TABLE IF NOT EXISTS public.posts
(
    id integer NOT NULL DEFAULT nextval('posts_id_seq'::regclass),
    title character varying COLLATE pg_catalog."default" NOT NULL,
    content character varying COLLATE pg_catalog."default" NOT NULL,
    status posts_status_enum NOT NULL DEFAULT 'new'::posts_status_enum,
    created_at timestamp without time zone NOT NULL DEFAULT now(),
    updated_at timestamp without time zone NOT NULL DEFAULT now(),
    "authorId" integer,
    "categoryId" integer,
    CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e" PRIMARY KEY (id),
    CONSTRAINT "UQ_2d82eb2bb2ddd7a6bfac8804d8a" UNIQUE (title),
    CONSTRAINT "FK_168bf21b341e2ae340748e2541d" FOREIGN KEY ("categoryId")
        REFERENCES public.categories (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT "FK_c5a322ad12a7bf95460c958e80e" FOREIGN KEY ("authorId")
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
*/
