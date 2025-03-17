import Joi from 'joi';

export const dateSchema = Joi.object({
    id: Joi.number().optional(),
    month: Joi.alternatives().try(Joi.string(), Joi.number()).required(),
    week: Joi.alternatives().try(Joi.string(), Joi.number()).required(),
    day: Joi.alternatives().try(Joi.string(), Joi.number()).required(),
});