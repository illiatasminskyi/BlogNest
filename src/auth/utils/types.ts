import { Users } from 'src/users/users.entity';

export type UserDetails = {
  facebookId: string;
  email: string;
  firstName: string;
  lastName: string;
};

export type Done = (err: Error, user: Users) => void;
