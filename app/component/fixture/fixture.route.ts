import { Application } from 'express';
import FixtureController from './fixture.controller';
import * as url from './fixture.url';
import { asyncHandler } from '../../middleware/async-handler';
import FixtureValidation from './fixture.validation';
import checkAuthorization from '../../middleware/check-authorization';
import requireAuth from '../../middleware/require-auth';
import { GET_PENDING_FIXTURES } from './fixture.url';
/// /     View Pending Fixtures: Users should be logged in to view pending fixtures.
class FixtureRoute {
  public fixtureController: FixtureController = new FixtureController();

  public routes = (app: Application): void => {
    app
      .route(`${url.CREATE_FIXTURE}`)
      .post(
        asyncHandler(FixtureValidation.validateCreateFixture),
        asyncHandler(checkAuthorization),
        asyncHandler(this.fixtureController.create),
      );
    app
      .route(`${url.EDIT_FIXTURE}:fixture`)
      .put(
        asyncHandler(FixtureValidation.validateEditOrRemoveOrViewFixture),
        asyncHandler(checkAuthorization),
        asyncHandler(this.fixtureController.edit),
      );
    app
      .route(`${url.GET_COMPLETED_FIXTURES}`)
      .get(
        asyncHandler(requireAuth),
        asyncHandler(this.fixtureController.getCompleted),
      );
    app
      .route(`${url.GET_FIXTURE}s`)
      .get(asyncHandler(this.fixtureController.getAll));
    app
      .route(`${url.GET_FIXTURE}s`)
      .get(asyncHandler(this.fixtureController.getAll));
    app
      .route(`${url.GET_FIXTURE}/:fixture`)
      .get(
        asyncHandler(FixtureValidation.validateEditOrRemoveOrViewFixture),
        asyncHandler(this.fixtureController.getOne),
      );
    app
      .route(`${url.GET_PENDING_FIXTURES}`)
      .get(
        asyncHandler(requireAuth),
        asyncHandler(this.fixtureController.getPending),
      );
    app
      .route(`${url.REMOVE_FIXTURE}:fixture`)
      .put(
        asyncHandler(FixtureValidation.validateEditOrRemoveOrViewFixture),
        asyncHandler(checkAuthorization),
        asyncHandler(this.fixtureController.remove),
      );
  };
}

export default FixtureRoute;
