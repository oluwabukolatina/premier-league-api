import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { UnknownInterface } from '../lib/unknown.interface';
import logger from '../lib/logger';
import CustomError from '../exception/custom.error';
import ResponseHandler from '../lib/response-handler';

function logError(
  request: Request,
  body: UnknownInterface,
  message: string,
  status: number,
) {
  return logger.error(
    `BODY- ${body}, STATUS - ${status}, MESSAGE - ${message}, URL - ${request.originalUrl}, METHOD - ${request.method}, IP - ${request.ip}`,
  );
}

function errorMiddleware(
  error: CustomError | UnknownInterface,
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const status = error.status || 500;
  const hasErrorMessage = error && error.message;
  const message = hasErrorMessage
    ? hasErrorMessage.toString()
    : 'Something went wrong';
  const err = error.error || null;
  const body = `${JSON.stringify(request.body)}`;
  logError(request, body, message, status);
  if (status === StatusCodes.BAD_REQUEST) {
    return ResponseHandler.BadRequestResponse(response, message, err);
  }
  if (status === StatusCodes.FORBIDDEN) {
    return ResponseHandler.ForbiddenRequestResponse(response, message, err);
  }
  if (status === StatusCodes.NOT_FOUND) {
    return ResponseHandler.NotFoundResponse(response, message);
  }
  if (status === StatusCodes.UNAUTHORIZED) {
    return ResponseHandler.UnAuthorizedResponse(response, message);
  }
  if (status === StatusCodes.INTERNAL_SERVER_ERROR) {
    return ResponseHandler.ServerErrorResponse(response, status, message, err);
  }
  return ResponseHandler.ServerErrorResponse(
    response,
    status,
    'unable to complete request',
    err,
  );
}

export default errorMiddleware;
