import { Users } from 'src/users/users.entity';
import { UserDetails } from './types';

export interface AuthenticationProvider {
  validateUser(details: UserDetails);
  createUser(details: UserDetails);
  findUser(discordId: string): Promise<Users | undefined>;
}
