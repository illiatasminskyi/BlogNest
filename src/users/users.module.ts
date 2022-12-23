import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entity/users.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  providers: [
    UsersService,
    {
      provide: 'AUTH_SERVICE',
      useClass: UsersService,
    },
  ],
  controllers: [UsersController],
  exports: [
    {
      provide: 'AUTH_SERVICE',
      useClass: UsersService,
    },
  ],
})
export class UsersModule {}
