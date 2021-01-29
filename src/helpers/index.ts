import { Response } from 'express';
import { EStatus } from '../models/index';

export class GeneralHelper {
  /**
   * @description Send user information
   * @param {object} res The http response object
   * @param {number} statusCode The response status code
   * @param {number} status Status for API response. The two possible values for this prop are "success" and "error"
   * @param {string} message The response message for your API
   * @returns {object} The http response object
   */
  static sendResponse(
    res: Response,
    statusCode: number,
    status: EStatus,
    message: string,
    data?: object,
  ) {
    return res.status(statusCode).json({
      message,
      status,
      data: data || null,
    });
  }

  /**
   * @description Send user information
   * @param {object} obj The http response object
   * @returns {Array} Return the array of keys.
   */
  static getObjectKeys(obj: Object): string[] {
    var keys: string[] = [];
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) keys.push(key);
    }

    return keys;
  }

  /**
   * @description If the field specified in the rule object is missing from the data passed,
   * @param {object} obj The http response object
   * @returns {any} Return true or error message
   */
  static checkObjectMatch(obj: any): any {
    if (typeof obj['data'] === 'string') return true;
    const fieldToBeValidated: string = obj.rule.field;

    if (fieldToBeValidated.indexOf('.') !== -1) {
      const mainKey = fieldToBeValidated.substring(
        0,
        fieldToBeValidated.indexOf('.'),
      );
      const innerKey = fieldToBeValidated.substring(
        fieldToBeValidated.indexOf('.') + 1,
        fieldToBeValidated.length,
      );

      if (!obj['data'][mainKey]) {
        return this.sendMissingFromDataErrorMsg(mainKey);
      }
      if (!obj['data'][mainKey][innerKey]) {
        return this.sendMissingFromDataErrorMsg(fieldToBeValidated);
      }
    } else {
      if (!obj['data'][fieldToBeValidated]) {
        return this.sendMissingFromDataErrorMsg(fieldToBeValidated);
      }
    }

    return true;
  }

  static sendMissingFromDataErrorMsg(field: string) {
    const message = `field ${field} is missing from data.`;
    return { error: message };
  }

  static validateRule(value: any, conditionValue: any, condition: string) {
    var result: boolean;
    switch (condition) {
      case 'eq':
        result = value === conditionValue;
        break;
      case 'neq':
        result = value != conditionValue;
        break;
      case 'gt':
        result = value > conditionValue;
        break;
      case 'gte':
        result = value >= conditionValue;
        break;
      case 'contains':
        result = value.toString().includes(conditionValue.toString());
        break;
      default:
        result = false;
    }
    return result;
  }
}
