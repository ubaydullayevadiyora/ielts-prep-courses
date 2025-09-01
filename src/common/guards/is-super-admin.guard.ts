import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';

@Injectable()
export class IsSuperAdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const { user } = context.switchToHttp().getRequest();

    if (user?.role === 'admin' && user?.isCreator) {
      return true;
    }

    throw new ForbiddenException('Only super admin can access this resource');
  }
}
