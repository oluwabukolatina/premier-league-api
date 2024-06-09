import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import AuthService from './auth.service';
import ResponseHandler from '../../../lib/response-handler';

class AuthController {
  public signIn = async (request: Request, response: Response) => {
    const result = await AuthService.login({
      email: request.body.email,
      password: request.body.password,
    });
    return ResponseHandler.SuccessResponse(
      response,
      StatusCodes.OK,
      'Log in successful',
      result,
    );
  };

  public signUpAdmin = async (request: Request, response: Response) => {
    await AuthService.createUser({
      email: request.body.email,
      firstName: request.body.firstName,
      lastName: request.body.lastName,
      password: request.body.password,
      role: 'ADMIN',
    });
    return ResponseHandler.CreatedResponse(response, 'admin created');
  };

  public signUpUser = async (request: Request, response: Response) => {
    await AuthService.createUser({
      email: request.body.email,
      firstName: request.body.firstName,
      lastName: request.body.lastName,
      password: request.body.password,
      role: 'USER',
    });
    return ResponseHandler.CreatedResponse(response, 'user created');
  };
}
export default AuthController;
