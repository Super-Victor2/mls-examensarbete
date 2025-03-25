import middy from '@middy/core';
import { errorHandler } from '../../middlewares/errorHandler.mjs';
import { sendResponse } from '../../response/index.mjs';
import { db } from '../../services/index.mjs';
import { v4 as uuidv4 } from 'uuid';
import { validateTokenAdmin } from '../../middlewares/validateTokenAdmin.mjs';
import { menuSchema } from '../../models/menuSchema.mjs';

export const handler = middy(async (event) => {
    console.log('Received event:', event);
    try {
        const body = JSON.parse(event.body);
        const price = body.items[0]?.price; 

        const { error } = menuSchema.validate(body);
        if (error) {
            console.error('Validation error:', error.message);
            return sendResponse(400, {error: `Validation Error: ${error.message}`});
        }

        const id = body.id || uuidv4();
        const newMenu = {
            id, 
            price: body.items[0]?.price,
            tier: body.items[0]?.tier,
            time: body.items[0]?.time,
            type: body.items[0]?.type,
            items: body.items[0]?.items,
        }

        const params = {
            TableName: 'mls-menu',
            Item: newMenu,
        }

        await db.put(params);

        return sendResponse(200, 'New menu has been added', newMenu)
    } catch (error) {
        console.error('Error:', error)
        return sendResponse(500, 'Internal server error')
    }
})
.use(errorHandler())
.use(validateTokenAdmin());
