import {
    type CanActivate,
    type ExecutionContext,
    Injectable,
    Scope,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import type { RoleName } from '../db/entities/Role.entity.ts';
import { ROLES_KEY } from '../../modules/auth/roles.decorator.ts';

@Injectable({ scope: Scope.REQUEST })
export class AuthMiddleware implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

    async canActivate(context: ExecutionContext) {
        const requiredRoles = this.reflector.getAllAndOverride<RoleName[]>(
            ROLES_KEY,
            [context.getHandler(), context.getClass()]
        );
        if (!requiredRoles) {
            return true;
        }
        if (requiredRoles.length < 1) {
            return true;
        }
        //const request = context.switchToHttp().getRequest<Request>();
        return false;
    }
}
