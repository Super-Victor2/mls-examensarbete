import middy from '@middy/core';
import { errorHandler } from '../../middlewares/errorHandler.mjs';
import { sendResponse } from '../../response/index.mjs';
import { db } from '../../services/index.mjs';
import { validateTokenAdmin } from '../../middlewares/validateTokenAdmin.mjs';
import { userSchema } from '../../models/userSchema.mjs';

export const handler = middy(async (event) => {
    try {
        const id = event.pathParameters?.id;

        if(!id) {
            console.error('No menu id provided');
            return sendResponse(400, { error: 'Menu item id is required'});
        }

        const result = await db.get({
            TableName: 'mls-menu',
            Key: { id},
        });

        const existingMenu = result.Item;
        if (!existingMenu) {
            return sendResponse(404, { error: 'Menu item not found'})
        }

        const updateFields = userSchema.validate(JSON.parse(event.body), { allowUnknown: true, stripUnknown: true});
        if (updateFields.error) {
            console.error('Validation error:' + updateFields.error.message)
            return sendResponse(400, { error: `Validation Error: ${updateFields.error.message}`});
        }

        const updatedMenu = {
            ...existingMenu,
            ...updateFields,
        }

        const params = {
            TableName: 'mls-menu',
            Item: updatedMenu,
        }

        await db.put(params)

    } catch (error) {

    }
})
.use(errorHandler())
.use(validateTokenAdmin());