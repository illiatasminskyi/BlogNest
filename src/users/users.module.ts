import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { FacebookStrategy } from './facebook.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  providers: [UsersService, FacebookStrategy],
  controllers: [UsersController],
})
export class UsersModule {}
