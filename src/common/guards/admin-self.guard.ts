// admin-self.guard.ts
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

    // SuperAdmin hammani boshqaradi
    if (user?.role === 'admin' && user?.isCreator) return true;

    // Oddiy admin faqat o'zini update/delete qila oladi
    if (user?.role === 'admin' && user?.id === +targetAdminId) return true;

    throw new ForbiddenException('You can only manage your own account');
  }
}
