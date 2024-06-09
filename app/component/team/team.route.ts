import { Application } from 'express';
import TeamController from './team.controller';
import * as url from './team.url';
import { asyncHandler } from '../../middleware/async-handler';
import checkAuthorization from '../../middleware/check-authorization';
import TeamValidation from './team.validation';
import TeamMiddleware from './team.middleware';
import requireAuth from '../../middleware/require-auth';

class TeamRoute {
  public teamController: TeamController = new TeamController();

  public routes = (app: Application): void => {
    app
      .route(`${url.CREATE_TEAM}`)
      .post(
        asyncHandler(TeamValidation.validateCreateTeam),
        asyncHandler(checkAuthorization),
        asyncHandler(TeamMiddleware.checkIfTeamAlreaxyExists),
        asyncHandler(this.teamController.create),
      );
    app
      .route(`${url.EDIT_TEAM}:team`)
      .put(
        asyncHandler(TeamValidation.validateEditOrRemoveOrViewTeam),
        asyncHandler(checkAuthorization),
        asyncHandler(this.teamController.edit),
      );
    app
      .route(`${url.GET_TEAM}s`)
      .get(asyncHandler(requireAuth), asyncHandler(this.teamController.getAll));
    app
      .route(`${url.GET_TEAM}/:team`)
      .get(
        asyncHandler(TeamValidation.validateEditOrRemoveOrViewTeam),
        asyncHandler(this.teamController.getOne),
      );
    app
      .route(`${url.REMOVE_TEAM}:team`)
      .put(
        asyncHandler(TeamValidation.validateEditOrRemoveOrViewTeam),
        asyncHandler(checkAuthorization),
        asyncHandler(this.teamController.remove),
      );
  };
}

export default TeamRoute;
