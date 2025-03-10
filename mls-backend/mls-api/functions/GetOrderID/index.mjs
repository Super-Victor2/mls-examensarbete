import middy from '@middy/core';
import { errorHandler } from '../../middlewares/errorHandler.mjs'
import { sendResponse } from '../../response/index.mjs'
import { db } from '../../services/index.mjs';
import { validateTokenAdmin } from '../../middlewares/validateTokenAdmin.mjs';

export const handler = middy(async (event) => {
    try {
        const orderId = event.pathParameters?.id;

        if (!orderId) {
            console.error('No orderId provided');
            return sendResponse(400, { error: 'Order item ID is required' });
        }

        const params = {
            TableName: 'mls-orders',
            Key : { orderId },
        };

        const result = await db.get(params);
        console.log('DynamoDB result:', result);

        if (!result.Item) {
            return sendResponse(404, { error: 'Order item not found' });
        }

        return sendResponse(200, result.Item);
    } catch(error) {
        console.error('Error fetching order item:', error);
        throw error
    }
}).use(errorHandler())
  .use(validateTokenAdmin());