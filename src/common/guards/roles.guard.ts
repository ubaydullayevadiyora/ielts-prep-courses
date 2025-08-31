import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../../app.constants';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles) {
      return true; // agar role berilmagan bo'lsa, default o'tqazib yuboramiz
    }

    const { user } = context.switchToHttp().getRequest();

    if (!user) throw new ForbiddenException('User not authenticated');
    if (!requiredRoles.includes(user.role)) {
      throw new ForbiddenException('You do not have access to this resource');
    }

    return true;
  }
}
