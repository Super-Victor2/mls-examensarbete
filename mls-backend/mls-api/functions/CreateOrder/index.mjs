import middy from '@middy/core';
import { errorHandler } from '../../middlewares/errorHandler.mjs';
import { sendResponse } from '../../response/index.mjs';
import { db } from '../../services/index.mjs';
import { v4 as uuidv4 } from 'uuid';
import { orderSchema } from '../../models/orderSchema.mjs';
import { validateToken } from '../../middlewares/validateToken.mjs';

export const handler = middy(async (event) => {
    console.log('Received event:', event);
    try {
        const body = JSON.parse(event.body);

        const { email } = event.decodedToken;

        body.email = email;

        const { error } = orderSchema.validate(body);
        if (error) {
            console.error('Validation error:', error.message);
            return sendResponse(400, { error: `Validation Error: ${error.message}` });
        }

        const orderId = body.orderId || uuidv4();
        const newOrder = {
            orderId,
            items: body.items,
            totalPrice: body.totalPrice,
            status: 'pending',
            email: body.email,
        };

        const params = {
            TableName: 'mls-orders',
            Item: newOrder,
        };

        await db.put(params);

        return sendResponse(200, 'New order has been added', newOrder);
    } catch (error) {
        console.error('Caught error:', error.message);
        return sendResponse(500, { error: 'Internal Server Error' });
    }
})
.use(errorHandler())
.use(validateToken());

