import { Inject, Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { Users } from 'src/users/entity/users.entity';
import { AuthService } from '../auth.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
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
