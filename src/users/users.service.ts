import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './users.dto';
import { Users } from './users.entity';

@Injectable()
export class UsersService {
  @InjectRepository(Users)
  private readonly repository: Repository<Users>;

  public createUser(body: CreateUserDto): Promise<Users> {
    const user: Users = new Users();

    user.email = body.email;
    user.firstName = body.firstName;
    user.lastName = body.lastName;
    // user.token = body.accessToken;

    return this.repository.save(user);
  }
}
