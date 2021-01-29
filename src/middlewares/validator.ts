import { Response, NextFunction } from 'express';
import Joi from 'joi';
import { GeneralHelper } from '../helpers';
import { EStatus } from '../models';

export class Validator {
  /**
   * @description creates a actual data against schema
   * @param  {object} data http request object to validate
   * @param {object} schema joi schema to compare with actual data for validation
   * @param  {object} res The http response object
   * @param  {function} next The function which allow us to go to next middleware
   * @returns {any} The http response object
   */
  static validator(
    res: Response,
    next: NextFunction,
    data: any,
    schema: Joi.AnySchema,
  ) {
    const { error } = schema.validate(data);
    if (error) {
      const status = EStatus.error;
      return GeneralHelper.sendResponse(
        res,
        400,
        status,
        this.handleError(error.details) as string,
      );
    }
    next();
  }

  static handleError(errorDetails: any) {
    var errorMessage: string;
    errorDetails.forEach(({ message, type, context: { label } }: any) => {
      switch (type) {
        case 'any.required':
          errorMessage = `${label} is required.`;
          break;
        case 'object.base':
          errorMessage = `${label} should be an object.`;
          break;
        default:
          errorMessage = `${message.replace(/\\|(")/g, '')}.`;
      }
    });
    return errorMessage;
  }
}
