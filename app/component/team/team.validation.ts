import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import AppValidation from '../../middleware/app.validation';
import { ClientError } from '../../exception/client.error';
import SharedHelper from '../../lib/shared.helper';
import { TEAM_INCOREEC_FORM_ID } from './team.message';

const TeamValidation = {
  async validateCreateTeam(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    const schema = Joi.object({
      manager: Joi.string().required(),
      name: Joi.string().required(),
      numberOfPlayers: Joi.string().required(),
      stadium: Joi.string().required(),
    });
    return AppValidation.bodyBaseValidator(schema, request, response, next);
  },
  async validateEditOrRemoveOrViewTeam(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    if (request.params.team) {
      if (SharedHelper.validObjectId(request.params.team))
        return AppValidation.idValidator(next, response, request.params.team);
      throw new ClientError(TEAM_INCOREEC_FORM_ID);
    }
    throw new ClientError('team is required');
  },
};
export default TeamValidation;
