import { NextFunction, Request, Response } from 'express';
import { UnknownInterface } from '../lib/unknown.interface';
import { ClientError } from '../exception/client.error';
import SharedHelper from '../lib/shared.helper';

const AppValidation = {
  /**
   * joi validation
   * @param schema
   * @param request
   * @param response
   * @param next
   */
  async bodyBaseValidator(
    schema: UnknownInterface,
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    try {
      request.body = await schema.validateAsync(request.body);
      return next();
    } catch (error) {
      throw new ClientError(error.message.replace(/["]/gi, ''));
    }
  },
  async idValidator(
    next: NextFunction,
    response: Response,
    id: UnknownInterface,
  ) {
    if (SharedHelper.validObjectId(id)) return next();
    throw new ClientError('Incorrect Id Format, Kindly Check The Id');
  },
};
export default AppValidation;
