import { PassportSerializer } from '@nestjs/passport';
import { Inject, Injectable } from '@nestjs/common';
import { Users } from 'src/users/users.entity';
import { AuthenticationProvider } from './auth';
import { Done } from './types';
import { AuthService } from '../auth.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  // serializeUser(user: any, done: (err: Error, user: any) => void): any {
  //   done(null, user);
  // }

  // deserializeUser(user: Users, done: (err: Error, user: any) => void): any {
  //   done(null, user);
  // }

  constructor(
    @Inject('AUTH_SERVICE')
    private readonly authService: AuthService,
  ) {
    super();
  }
  serializeUser(user: Users, done: (err, user: Users) => void) {
    console.log('serializeUser');
    done(null, user);
  }
  async deserializeUser(user: Users, done: (err, user: Users) => void) {
    console.log('deserializeUser');
    const userDB = await this.authService.findUser(user.facebookId);
    return userDB ? done(null, userDB) : done(null, null);
  }
}
