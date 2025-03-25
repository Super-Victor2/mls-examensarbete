import Joi from 'joi';

export const menuSchema = Joi.object({
    id: Joi.alternatives().try(Joi.number(), Joi.string()).optional(),
    items: Joi.array().items(Joi.object({
        type: Joi.string().valid('Polering', 'Tvätt').required(),
        price: Joi.string().pattern(/^\d+kr$/).required(),
        tier: Joi.string().valid('Standard', 'Bas', 'Deluxe').required(),
        items: Joi.array().items(Joi.object({
            name: Joi.string().required(),
            included: Joi.boolean().required(),
        })).required(),
        time: Joi.string().pattern(/^\d+([.,]\d+)?\s*(tim|min)$/).required(),
    })).required(),
});