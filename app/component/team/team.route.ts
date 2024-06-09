import { Application } from 'express';
import TeamController from './team.controller';
import * as url from './team.url';
import { asyncHandler } from '../../middleware/async-handler';
import checkAuthorization from '../../middleware/check-authorization';
import TeamValidation from './team.validation';
import TeamMiddleware from './team.middleware';

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
      .route(`${url.REMOVE_TEAM}:team`)
      .put(
        asyncHandler(TeamValidation.validateEditOrRemoveTeam),
        asyncHandler(checkAuthorization),
        asyncHandler(this.teamController.remove),
      );
    app
      .route(`${url.EDIT_TEAM}:team`)
      .put(
        asyncHandler(TeamValidation.validateEditOrRemoveTeam),
        asyncHandler(checkAuthorization),
        asyncHandler(this.teamController.edit),
      );
  };
}

export default TeamRoute;
