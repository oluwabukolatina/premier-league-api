import { NextFunction, Request, Response } from 'express';
import { GO_MONEY_JWT_SECRET } from '../config/secrets';
import UserRepository from '../component/user/repository/user.repository';
import ResponseHandler from '../lib/response-handler';
import * as message from '../component/user/user.message';
import { UnAuthorizedError } from '../exception/un-authorized.error';
import Jwt from '../lib/jwt';
import { AUTH_TOKEN_REQUIRED } from '../component/user/auth/auth.message';

async function checkJwt(
  next: NextFunction,
  request: Request,
  response: Response,
  token: string,
) {
  const correctFormat = token.startsWith('Bearer');
  if (correctFormat) {
    request.user = Jwt.verifyToken(
      token.replace(/^Bearer\s/, '').trim(),
      GO_MONEY_JWT_SECRET,
    );
    const user = await UserRepository.find({
      email: request.user.email.toLowerCase(),
    });
    if (user) return next();
    return ResponseHandler.NotFoundResponse(
      response,
      message.MESSAGE_USER_ACCOUNT_NOT_FOUND,
    );
  }
  return ResponseHandler.UnAuthorizedResponse(
    response,
    'incorrect format - authorization must start with Bearer',
  );
}
async function requireAuth(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const token = request.header('Authorization');
  if (!token) throw new UnAuthorizedError(AUTH_TOKEN_REQUIRED);
  return checkJwt(next, request, response, token);
}

export default requireAuth;
