import { Application } from 'express';
import AuthController from './auth.controller';
import * as url from './auth.url';
import { asyncHandler } from '../../../middleware/async-handler';
import AuthValidation from './auth.validation';

class AuthRoute {
  public authController: AuthController = new AuthController();

  public routes = (app: Application): void => {
    app
      .route(`${url.SIGN_IN_ADMIN}`)
      .post(
        asyncHandler(AuthValidation.validateLogin),
        asyncHandler(this.authController.signInAdmin),
      );
    app
      .route(`${url.SIGN_UP_ADMIN}`)
      .post(
        asyncHandler(AuthValidation.validateSignUp),
        asyncHandler(this.authController.signUpAdmin),
      );
  };
}

export default AuthRoute;
