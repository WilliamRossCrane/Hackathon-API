import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';
import { ArcjetService } from '../../lib/arcjet/arcjet.service';

@Injectable()
export class ArcjetGuard implements CanActivate {
  constructor(private readonly arcjetService: ArcjetService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    if (!this.arcjetService.isEnabled) {
      return true;
    }

    const req = context.switchToHttp().getRequest<Request>();
    const decision = await this.arcjetService.protect(req);

    if (!decision) {
      return true;
    }

    if (decision.isDenied()) {
      throw new ForbiddenException(
        'Request blocked by Arcjet security policy.',
      );
    }

    return true;
  }
}
