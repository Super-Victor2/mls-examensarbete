import Joi from 'joi';

export const orderSchema = Joi.object({
    orderId: Joi.number().optional(),
    items: Joi.array().items(Joi.object({
        type: Joi.string().valid('brons', 'silver', 'guld').required(),
        price: Joi.string().pattern(/^\d+kr$/).required(),
        description: Joi.string().required(),
        time: Joi.alternatives().try(Joi.string(), Joi.number()).required(),
    })).required(),
    totalPrice: Joi.string().pattern(/^\d+kr$/).required(),
    status: Joi.string().required(),
    email: Joi.string().optional(),
});