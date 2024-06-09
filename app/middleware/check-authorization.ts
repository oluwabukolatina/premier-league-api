import { NextFunction, Request, Response } from 'express';
import { GO_MONEY_JWT_SECRET } from '../config/secrets';
import { UnAuthorizedError } from '../exception/un-authorized.error';
import Jwt from '../lib/jwt';
import UserService from '../component/user/user.service';

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
    throw new UnAuthorizedError('user not authorized for this action');
  }
  throw new UnAuthorizedError(
    'incorrect format - user must start with Bearer ',
  );
}
async function checkAuthorization(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const token = request.header('Authorization');
  if (!token)
    throw new UnAuthorizedError(
      'Authorization Denied: Authentication Token is Required',
    );
  return checkTheAuthorization(next, request, response, token);
}
export default checkAuthorization;
