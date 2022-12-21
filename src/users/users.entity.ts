import { Posts } from 'src/posts/posts.entity';
import { Role } from 'src/roles/role.enum';
import {
  Entity,
  Column,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

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
