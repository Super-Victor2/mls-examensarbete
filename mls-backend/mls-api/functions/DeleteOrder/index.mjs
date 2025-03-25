import middy from '@middy/core';
import { errorHandler } from '../../middlewares/errorHandler.mjs';
import { sendResponse } from '../../response/index.mjs';
import { db } from '../../services/index.mjs';
import { validateToken } from '../../middlewares/validateToken.mjs';

export const handler = middy(async (event) => {
    try {
        console.log('Received Event:', JSON.stringify(event, null, 2));

        const orderId = event.pathParameters?.id;

        if (!orderId) {
            console.error('No orderId provided');
            return sendResponse(400, { error: 'Order item ID is required' });
        }

        console.log('Deleting order with ID:', orderId);

        const params = {
            TableName: 'mls-orders',
            Key: { orderId },
        };

        await db.delete(params);

        console.log('Order deleted successfully:', orderId);
        return sendResponse(200, { message: 'Order deleted' });
    } catch (error) {
        console.error('Error occurred:', error);
        return sendResponse(500, { error: 'Internal Server Error' });
    }
}).use(errorHandler())
.use(validateToken());