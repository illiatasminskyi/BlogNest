import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/users/entity/users.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SessionSerializer } from './utils/Serializer';
import { FacebookStrategy } from './utils/facebook.strategy';

@Module({
  controllers: [AuthController],
  imports: [TypeOrmModule.forFeature([Users])],
  providers: [
    {
      provide: 'AUTH_SERVICE',
      useClass: AuthService,
    },
    AuthService,
    FacebookStrategy,
    SessionSerializer,
  ],
  exports: [
    {
      provide: 'AUTH_SERVICE',
      useClass: AuthService,
    },
  ],
})
export class AuthModule {}
