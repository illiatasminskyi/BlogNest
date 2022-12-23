import { Posts } from 'src/posts/entity/posts.entity';
import { Role } from 'src/roles/role.enum';
import { Entity, Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
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
    default: Role.Admin,
  })
  roles: Role[];

  @OneToMany(() => Posts, (post) => post.author)
  posts: Posts[];
}
