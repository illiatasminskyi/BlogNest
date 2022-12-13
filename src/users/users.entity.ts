import { Posts } from 'src/posts/posts.entity';
import { Role } from 'src/roles/role.enum';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.Manager,
  })
  roles: Role[];

  @OneToMany(() => Posts, (post) => post.author)
  posts: Posts[];

  @Column()
  token: string;
}
