import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';

@Injectable()
export class AdminSelfGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const { user } = request;
    const targetAdminId = request.params.id; // URL: /admins/:id

    if (user?.role === 'admin' && user?.isCreator) return true;

    if (user?.role === 'admin' && user?.id === +targetAdminId) return true;

    throw new ForbiddenException('You can only manage your own account');
  }
}
