import {
    type CanActivate,
    type ExecutionContext,
    Injectable,
    Scope,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import type { Request } from 'express';
import { ROLES_KEY } from '../../modules/auth/roles.decorator.ts';
import { getConfig } from '../config';
import { jwtVerify } from 'jose';
import { JWTPublicSPKI, SudoUserInfo, type UserToken } from '../utils/sandi.ts';
import type { Role } from '../db/entities/User.entity.ts';

@Injectable({ scope: Scope.REQUEST })
export class AuthMiddleware implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

    async canActivate(context: ExecutionContext) {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(
            ROLES_KEY,
            [context.getHandler(), context.getClass()]
        );
        if (!requiredRoles) {
            return true;
        }
        if (requiredRoles.length < 1) {
            return true;
        }
        const request = context.switchToHttp().getRequest<Request>();
        const authorizationToken = this.getAuthorizationToken(request);
        const sudoToken = getConfig('SUDO_TOKEN');
        if (authorizationToken === sudoToken) {
            (request as AuthorizedRequest)['user'] = SudoUserInfo;
            return true;
        }
        const userData = await this.decodeJWT(authorizationToken);
        (request as AuthorizedRequest)['user'] = userData;
        if (requiredRoles.includes('EVERYONE')) {
            return true;
        }
        for (const role of requiredRoles) {
            if (userData.roles.includes(role)) {
                return true;
            }
        }
        return false;
    }

    getAuthorizationToken(request: Request) {
        const { headers, cookies } = request;
        const authBearerHeader = headers.authorization;
        if (typeof authBearerHeader === 'string') {
            return authBearerHeader.substring(7);
        }
        const authBearerCookie = cookies['authorization'];
        if (typeof authBearerCookie === 'string') {
            return authBearerCookie.substring(7);
        }
        throw new AuthorizationStringEmpty(
            'Please include authorization key as bearer auth header/cookie'
        );
    }

    async decodeJWT(authorizationToken: string) {
        const verifiedToken = await jwtVerify<UserToken>(
            authorizationToken,
            JWTPublicSPKI
        ).catch((e) => {
            throw new InvalidJWT((e as Error).message);
        });
        return verifiedToken.payload;
    }
}

export type AuthorizedRequest = Request & { user: UserToken };

export class AuthorizationStringEmpty extends Error {
    constructor(message: string) {
        super(message);
    }
}

export class InvalidJWT extends Error {
    constructor(message: string) {
        super(message);
    }
}
