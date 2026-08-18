import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class RoleGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request: Request = context.switchToHttp().getRequest();
    const rawRole = request.headers['role'];
    const role = Array.isArray(rawRole) ? rawRole[0] : rawRole;
    if (role !== 'admin') {
      throw new UnauthorizedException(
        'Access denied. Admin privileges required.',
      );
    }
    return true;
  }
}
