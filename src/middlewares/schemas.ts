import Joi from 'joi';

export const ruleSchema = Joi.object({
  field: Joi.string().required(),
  condition: Joi.string().valid('eq', 'neq', 'gt', 'gte', 'contains'),
  condition_value: Joi.alternatives()
    .try(Joi.string(), Joi.number())
    .required(),
});

export const fieldaSchema = Joi.object({
  rule: ruleSchema.required(),
  data: Joi.alternatives()
    .try(Joi.string(), Joi.array(), Joi.object())
    .required(),
});
