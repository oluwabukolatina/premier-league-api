import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import AppValidation from '../../../middleware/app.validation';

const AuthValidation = {
  async validateLogin(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    const schema = Joi.object({
      email: Joi.string().email().label('Email').required(),
      password: Joi.string().label('Password').required(),
    });
    return AppValidation.bodyBaseValidator(schema, request, response, next);
  },
  async validateSignUp(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    const schema = Joi.object({
      email: Joi.string().email().label('Email').required(),
      firstName: Joi.string().label('first name').required(),
      lastName: Joi.string().label('last name').required(),
      password: Joi.string()
        .label('Password')
        .required()
        .regex(/^.{8,200}$/)
        .message('Password should contain at least 8 characters')
        .min(8),
    });
    return AppValidation.bodyBaseValidator(schema, request, response, next);
  },
};
export default AuthValidation;
