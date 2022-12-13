import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './users.dto';
import { Users } from './users.entity';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private readonly repo: Repository<Users>,
  ) {}

  create(createUserDto: CreateUserDto) {
    const user = this.repo.create(createUserDto);
    return this.repo.save(user);
  }
}
