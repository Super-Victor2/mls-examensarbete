import middy from '@middy/core';
import { errorHandler } from '../../middlewares/errorHandler.mjs'
import { sendResponse } from '../../response/index.mjs'
import { db } from '../../services/index.mjs';
import { validateToken } from '../../middlewares/validateToken.mjs';
import { validateTokenAdmin } from '../../middlewares/validateTokenAdmin.mjs';

export const handler = middy(async (event) => {
    try {
        const { email } = event.decodedToken;

        const params = {
            TableName: 'mls-orders',
            FilterExpression: 'email = :email',
            ExpressionAttributeValues: {
                ':email': email,
            },
        };

        const result = await db.scan(params);

        return sendResponse(200, result.Items);
    } catch(error) {
        return sendResponse(500, { error: 'Internal Server Error' });
    }
}).use(errorHandler())
  .use(validateToken());