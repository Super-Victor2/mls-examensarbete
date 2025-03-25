import Joi from 'joi';

export const userSchema = Joi.object({
    email: Joi.string().pattern(/@/).required(),
    password: Joi.string().min(3).required(),
    firstname: Joi.string().optional(),
    lastname: Joi.string().optional(),
    tel: Joi.string().optional(),
});