import Joi from 'joi';

export const userSchema = Joi.object({
    email: Joi.string().pattern(/@/).required(),
    username: Joi.string().min(3).required(),
    password: Joi.string().min(3).required(),
});