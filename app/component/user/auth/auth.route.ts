import { Application } from 'express';
import AuthController from './auth.controller';
import * as url from './auth.url';
import { asyncHandler } from '../../../middleware/async-handler';
import AuthValidation from './auth.validation';
import { SIGN_IN_USER } from './auth.url';

class AuthRoute {
  public authController: AuthController = new AuthController();

  public routes = (app: Application): void => {
    app
      .route(`${url.SIGN_IN_ADMIN}`)
      .post(
        asyncHandler(AuthValidation.validateLogin),
        asyncHandler(this.authController.signIn),
      );
    app
      .route(`${url.SIGN_UP_ADMIN}`)
      .post(
        asyncHandler(AuthValidation.validateSignUp),
        asyncHandler(this.authController.signUpAdmin),
      );
    app
      .route(`${url.SIGN_IN_USER}`)
      .post(
        asyncHandler(AuthValidation.validateLogin),
        asyncHandler(this.authController.signIn),
      );
    app
      .route(`${url.SIGN_UP_USER}`)
      .post(
        asyncHandler(AuthValidation.validateSignUp),
        asyncHandler(this.authController.signUpUser),
      );
  };
}

export default AuthRoute;
