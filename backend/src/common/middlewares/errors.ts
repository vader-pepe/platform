import {
    type ArgumentsHost,
    Catch,
    type ExceptionFilter,
} from '@nestjs/common';
import type { Response } from 'express';
import { UserNotFound } from '../../modules/user/user.service.ts';
import { AuthorizationStringEmpty, InvalidJWT } from './auth.ts';

const NotFoundErrors = [UserNotFound] as const;
type NotFoundError = (typeof NotFoundErrors)[number];

@Catch(...NotFoundErrors)
export class EntityNotFoundExceptionFilter implements ExceptionFilter {
    catch(exception: NotFoundError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        response.status(404).json({ message: exception.toString() });
    }
}

const AuthorizationErrors = [AuthorizationStringEmpty, InvalidJWT] as const;
type AuthorizationError = (typeof AuthorizationErrors)[number];

@Catch(...AuthorizationErrors)
export class AuthorizationExceptionFilter implements ExceptionFilter {
    catch(exception: AuthorizationError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        response.status(403).json({ message: exception.toString() });
    }
}
