import { Request, Response } from 'express';
import { GeneralHelper } from '../helpers';
import { EStatus } from '../models/index';

export class HomeController {
  /**
   * @description Display welcome message with my info
   * @param  {object} req The http request object
   * @param  {object} res The http response object
   * @returns {object} The http response object
   */
  static welcomeMessage(req: Request, res: Response) {
    const payload = {
      name: 'Carlos Harerimana',
      github: '@harerakalex',
      email: 'hareraloston@gmail.com',
      mobile: '250780289165',
      twitter: '@carlos_harera',
    };
    const message = 'My Rule-Validation API';

    return GeneralHelper.sendResponse(
      res,
      200,
      EStatus.success,
      message,
      payload,
    );
  }

  /**
   * @description Validate our data
   * @param  {object} req The http request object
   * @param  {object} res The http response object
   * @returns {object} The http response object
   */
  static validator(req: Request, res: Response) {
    try {
      let payload: any;
      let message: any;
      let status: EStatus;
      let value: any;

      const { rule, data } = req.body;
      const dataField = rule.field as string;
      const ruleCondition = rule.condition as string;
      const ruleCondition_value = rule.condition_value;

      if (dataField.indexOf('.') !== -1) {
        const innerKey = dataField.substring(
          dataField.indexOf('.') + 1,
          dataField.length,
        );
        const outerKey = dataField.substring(0, dataField.indexOf('.'));
        value = data[outerKey][innerKey];
      } else {
        value = data[dataField];
      }

      const validateRule = GeneralHelper.validateRule(
        value,
        ruleCondition_value,
        ruleCondition,
      );

      if (validateRule) {
        payload = {
          validation: {
            error: false,
            field: dataField,
            field_value: value,
            condition: ruleCondition,
            condition_value: ruleCondition_value,
          },
        };

        message = `field ${dataField} successfully validated.`;
        status = EStatus.success;
      } else {
        payload = {
          validation: {
            error: true,
            field: dataField,
            field_value: value,
            condition: ruleCondition,
            condition_value: ruleCondition_value,
          },
        };

        message = `field ${dataField} failed validation.`;
        status = EStatus.error;
      }

      return GeneralHelper.sendResponse(res, 200, status, message, payload);
    } catch (error) {
      const message = 'Ooops, Something went wrong';
      const status = EStatus.error;
      return GeneralHelper.sendResponse(res, 500, status, message, error);
    }
  }
}
