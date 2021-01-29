import { Request, Response, NextFunction } from 'express';
import { GeneralHelper } from '../helpers';
import { EStatus } from '../models';
import { fieldaSchema } from './schemas';
import { Validator } from '../middlewares/validator';

export class GeneralValidator {
  /**
   * @description Validate our fields
   * @param  {object} req The HTTP request sent
   * @param  {object} res The http response object
   * @param  {function} next The function which allow us to go to next middleware
   */
  static fieldsValidator(req: Request, res: Response, next: NextFunction) {
    return Validator.validator(res, next, req.body, fieldaSchema);
  }

  /**
   * @description Check If the field specified in the rule object is missing from the data passed,
   * @param  {object} req The HTTP request sent
   * @param  {object} res The http response object
   * @param  {function} next The function which allow us to go to next middleware
   */
  static compareFieldsValidator(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const match = GeneralHelper.checkObjectMatch(req.body);

    if (match.error) {
      return GeneralHelper.sendResponse(res, 400, EStatus.error, match.error);
    }

    next();
  }
}
