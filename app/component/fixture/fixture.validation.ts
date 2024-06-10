import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import AppValidation from '../../middleware/app.validation';
import SharedHelper from '../../lib/shared.helper';
import { ClientError } from '../../exception/client.error';
import { FIXTURE_INCOREEC_FORM_ID } from './fixture.message';

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
  async validateEditOrRemoveOrViewFixture(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    if (request.params.fixture) {
      if (SharedHelper.validObjectId(request.params.fixture))
        return AppValidation.idValidator(
          next,
          response,
          request.params.fixture,
        );
      throw new ClientError(FIXTURE_INCOREEC_FORM_ID);
    }
    throw new ClientError('fixture is required');
  },
};
export default FixtureValidation;
