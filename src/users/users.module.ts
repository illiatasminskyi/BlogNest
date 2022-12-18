import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
// import { FacebookStrategy } from './utils/facebook.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  providers: [
    UsersService,
    // FacebookStrategy,
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
