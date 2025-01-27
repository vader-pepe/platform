import {
  type ArgumentsHost,
  Catch,
  type ExceptionFilter,
} from '@nestjs/common';
import type { Response } from 'express';
import { AuthorizationStringEmpty, InvalidJWT } from './auth.ts';
import { UserAlreadyExist, UserNotFound } from '../../modules/users/users.service.ts';

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

const BadRequestErrors = [UserAlreadyExist] as const;
type BadRequestError = (typeof BadRequestErrors)[number];

@Catch(...BadRequestErrors)
export class BadRequestExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestError, host: ArgumentsHost) {
    host.switchToHttp()
      .getResponse<Response>()
      .status(400)
      .json({ message: exception.toString() });
  }
}
