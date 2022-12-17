import { Posts } from 'src/posts/posts.entity';
import { Role } from 'src/roles/role.enum';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'facebook_id', unique: true })
  facebookId: string;

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
  roles: string;

  // @OneToMany(() => Posts, (post) => post.author)
  // posts: Posts[];
}
