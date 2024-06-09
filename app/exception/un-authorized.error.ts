import { StatusCodes } from 'http-status-codes';
import CustomError from './custom.error';

export class UnAuthorizedError extends CustomError {
  constructor(message: string) {
    super(StatusCodes.UNAUTHORIZED, message);
  }
}
