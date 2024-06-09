import { Request } from 'express';
import { validationResult } from 'express-validator';

const ExpressValidator = {
  validationResult(request: Request) {
    return validationResult(request);
  },
};
export default ExpressValidator;
