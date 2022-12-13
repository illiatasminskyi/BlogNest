import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Users } from 'src/users/users.entity';
import { Role } from './role.enum';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    // const user: Users = {
    //   email: 'illhchscia@gmail.com',
    //   firstName: 'Ihlsdclia',
    //   lastName: 'Tasmiccsnsffkyi',
    //   roles: [Role.Admin],
    //   id: 0,
    //   posts: [],
    //   token: 0,
    // };
    return requiredRoles.some((role) => user.roles?.includes(role));
  }
}
