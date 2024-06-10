import { NextFunction, Request, Response } from 'express';
import TeamService from './team.service';
import { ClientError } from '../../exception/client.error';
import SharedHelper from '../../lib/shared.helper';
import { TEAM_ALREADY_EXISTS } from './team.message';

const TeamMiddleware = {
  async checkIfTeamAlreadyExists(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    const team = await TeamService.get({
      name: SharedHelper.titleCase(request.body.name),
    });
    if (team) throw new ClientError(TEAM_ALREADY_EXISTS);
    return next();
  },
};
export default TeamMiddleware;
