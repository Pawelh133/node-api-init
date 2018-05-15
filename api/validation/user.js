import Joi from 'joi';

export const create = {
  body: {
    name: Joi.string().min(2).required(),
    surname: Joi.string().min(5).required()
  }
};
