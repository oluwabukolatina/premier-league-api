import { Application } from 'express';
import FixtureController from './fixture.controller';
import * as url from './fixture.url';
import { asyncHandler } from '../../middleware/async-handler';
import checkAuthorization from '../../middleware/check-authorization';
import FixtureValidation from './fixture.validation';

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
      .route(`${url.REMOVE_FIXTURE}:fixture`)
      .put(
        asyncHandler(FixtureValidation.validateEditOrRemoveTFixture),
        asyncHandler(checkAuthorization),
        asyncHandler(this.fixtureController.remove),
      );
    app
      .route(`${url.GET_FIXTURE}`)
      .post(
        asyncHandler(FixtureValidation.validateCreateFixture),
        asyncHandler(checkAuthorization),
        asyncHandler(this.fixtureController.create),
      );
  };
}

export default FixtureRoute;
