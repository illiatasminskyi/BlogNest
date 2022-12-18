import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FacebookStrategy } from './utils/facebook.strategy';
import { Users } from 'src/users/users.entity';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { SessionSerializer } from './utils/Serializer';
import { PassportModule } from '@nestjs/passport';

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
