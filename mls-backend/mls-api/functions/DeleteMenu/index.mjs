import middy from '@middy/core';
import { errorHandler } from '../../middlewares/errorHandler.mjs';
import { sendResponse } from '../../response/index.mjs';
import { db } from '../../services/index.mjs';
import { validateTokenAdmin } from '../../middlewares/validateTokenAdmin.mjs';

export const handler = middy(async (event) => {
    try {
        console.log('Received Event:', JSON.stringify(event, null, 2));

        const id = event.pathParameters?.id;

        if (!id) {
            console.error('No menu ID provided');
            return sendResponse(400, { error: 'Menu ID is required' });
        }

        const queryParams = {
            TableName: 'mls-menu',
            KeyConditionExpression: 'id = :id',
            ExpressionAttributeValues: {
                ':id': id,
            },
        };

        const result = await db.query(queryParams);

        if (result.Items.length === 0) {
            console.error('No item found with the given id');
            return sendResponse(404, { error: 'Menu item not found' });
        }

        const price = result.Items[0].price;

        console.log('Deleting menu with ID:', id, 'and Price:', price);

        const deleteParams = {
            TableName: 'mls-menu',
            Key: { id, price },
        };

        await db.delete(deleteParams);

        console.log('Menu deleted successfully:', id);
        return sendResponse(200, { message: 'Menu deleted' });
    } catch (error) {
        console.error('Error occurred:', error);
        return sendResponse(500, { error: 'Internal Server Error' });
    }
}).use(errorHandler())
.use(validateTokenAdmin());