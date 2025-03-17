import middy from '@middy/core';
import { errorHandler } from '../../middlewares/errorHandler.mjs';
import { sendResponse } from '../../response/index.mjs';
import { db } from '../../services/index.mjs';
import { v4 as uuidv4 } from 'uuid';
import { dateSchema } from '../../models/dateSchema.mjs';
import { validateToken } from '../../middlewares/validateToken.mjs';

export const handler = middy(async (event) => {
    console.log('Received event:', event);
    try {
        const body = JSON.parse(event.body);

        const { error } = dateSchema.validate(body);
        if (error) {
            console.error('Validation error:', error.message);
            return sendResponse(400, { error: `Validation Error: ${error.message}` });
        }

        const id = body.id || uuidv4();
        const newDate = {
            id,
            month: body.month,
            week: body.week,
            day: body.day,
        };

        const params = {
            TableName: 'mls-date',
            Item: newDate,
        };

        await db.put(params);

        return sendResponse(200, 'New order has been added', newDate);
    } catch (error) {
        console.error('Caught error:', error.message);
        return sendResponse(500, { error: 'Internal Server Error' });
    }
})
.use(errorHandler())
.use(validateToken());

