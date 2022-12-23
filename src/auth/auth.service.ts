import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/users/entity/users.entity';
import { Repository } from 'typeorm';
import { AuthenticationProvider } from './utils/auth';
import { UserDetails } from './utils/types';

@Injectable()
export class AuthService implements AuthenticationProvider {
  constructor(
    @InjectRepository(Users) private readonly repo: Repository<Users>,
  ) {}
  async validateUser(payload: UserDetails) {
    const { facebookId } = payload;
    const user = await this.repo.findOneBy({ facebookId });
    if (user) {
      await this.repo.update({ facebookId }, payload);
      return user;
    }
    return this.createUser(payload);
  }
  createUser(payload: UserDetails) {
    const user = this.repo.create(payload);
    return this.repo.save(user);
  }
  findUser(facebookId: string): Promise<Users | undefined> {
    return this.repo.findOneBy({ facebookId });
  }
  create(userData: Users) {
    const user = this.repo.create(userData);
    return this.repo.save(user);
  }
}
