import { NextFunction, Request, Response } from 'express';
import { GO_MONEY_JWT_SECRET } from '../config/secrets';
import { UnAuthorizedError } from '../exception/un-authorized.error';
import Jwt from '../lib/jwt';
import UserService from '../component/user/user.service';
import {
  AUTH_TOKEN_REQUIRED,
  INCORECT_AUTH_FORMAT,
  USER_NOT_AUTHORIZED,
} from '../component/user/auth/auth.message';

async function checkTheAuthorization(
  next: NextFunction,
  request: Request,
  response: Response,
  token: string,
) {
  if (token.startsWith('Bearer')) {
    request.user = Jwt.verifyToken(
      token.replace(/^Bearer\s/, '').trim(),
      GO_MONEY_JWT_SECRET,
    );
    const user = await UserService.get({
      email: request.user.email,
    });
    if (user.role === 'ADMIN') return next();
    throw new UnAuthorizedError(USER_NOT_AUTHORIZED);
  }
  throw new UnAuthorizedError(INCORECT_AUTH_FORMAT);
}
async function checkAuthorization(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const token = request.header('Authorization');
  if (!token) throw new UnAuthorizedError(AUTH_TOKEN_REQUIRED);
  return checkTheAuthorization(next, request, response, token);
}
export default checkAuthorization;
