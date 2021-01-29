import { Router } from 'express';
import { HomeController } from '../controllers';
import { GeneralValidator } from '../middlewares/generalValidator';

export const indexRouter = Router();

indexRouter.get('/', HomeController.welcomeMessage);

indexRouter.post(
  '/validate-rule',
  GeneralValidator.fieldsValidator,
  GeneralValidator.compareFieldsValidator,
  HomeController.validator,
);
