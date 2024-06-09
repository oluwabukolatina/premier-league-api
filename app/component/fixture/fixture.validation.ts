import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import AppValidation from '../../middleware/app.validation';
import { ClientError } from '../../exception/client.error';

const FixtureValidation = {
  async validateCreateFixture(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    const schema = Joi.object({
      awayTeam: Joi.string().required(),
      date: Joi.string().required(),
      homeTeam: Joi.string().required(),
      stadium: Joi.string(),
    });
    return AppValidation.bodyBaseValidator(schema, request, response, next);
  },
  async validateEditOrRemoveTFixture(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    if (request.params.fixture)
      return AppValidation.idValidator(next, response, request.params.fixture);
    throw new ClientError('fixture is required');
  },
};
export default FixtureValidation;
