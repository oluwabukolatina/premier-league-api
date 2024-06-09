import { StatusCodes } from 'http-status-codes';
import CustomError from './custom.error';

export class ServerError extends CustomError {
  constructor(message: string) {
    super(StatusCodes.INTERNAL_SERVER_ERROR, message);
  }
}
