import middy from '@middy/core';
import { errorHandler } from '../../middlewares/errorHandler.mjs'
import { sendResponse } from '../../response/index.mjs'
import { db } from '../../services/index.mjs';

export const handler = middy(async (event) => {
    try {
        const params = {
            TableName: 'mls-menu',
        };

        const result = await db.scan(params);

        // Sort the items based on the price in ascending order
        const sortedItems = result.Items.sort((a, b) => {
            const priceA = parseFloat(a.price.replace('kr', '').trim());
            const priceB = parseFloat(b.price.replace('kr', '').trim());
            return priceA - priceB;
        });

        return sendResponse(200, sortedItems);
    } catch(error) {
        return sendResponse(500, { error: 'Internal Server Error' });
    }
}).use(errorHandler())