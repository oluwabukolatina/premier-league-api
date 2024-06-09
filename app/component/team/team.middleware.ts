import { NextFunction, Request, Response } from 'express';
import TeamService from './team.service';
import { ClientError } from '../../exception/client.error';
import SharedHelper from '../../lib/shared.helper';

const TeamMiddleware = {
  async checkIfTeamAlreaxyExists(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    const team = await TeamService.get({
      name: SharedHelper.upperCaseTrim(request.body.name),
    });
    if (team) throw new ClientError('team already exists');
    return next();
  },
};
export default TeamMiddleware;
