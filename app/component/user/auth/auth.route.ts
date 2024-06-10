import { Application } from 'express';
import AuthController from './auth.controller';
import * as url from './auth.url';
import { asyncHandler } from '../../../middleware/async-handler';
import AuthValidation from './auth.validation';
import { limiter, rateLimiter } from '../../../middleware/rate-limit';

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
        rateLimiter,
        asyncHandler(AuthValidation.validateLogin),
        asyncHandler(this.authController.signIn),
      );
    app
      .route(`${url.SIGN_UP_USER}`)
      .post(
        rateLimiter,
        asyncHandler(AuthValidation.validateSignUp),
        asyncHandler(this.authController.signUpUser),
      );
  };
}

export default AuthRoute;
