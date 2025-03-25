import middy from '@middy/core';
import { errorHandler } from '../../middlewares/errorHandler.mjs';
import { sendResponse } from '../../response/index.mjs';
import { db } from '../../services/index.mjs';
import { userSchema } from '../../models/userSchema.mjs';
import { validateToken } from '../../middlewares/validateToken.mjs';
import { hashpassword } from '../../utils/index.mjs';

export const handler = middy(async (event) => {
    console.log('Received event:', event);
    try {
        const body = JSON.parse(event.body);

        const { email } = event.decodedToken;

        const result = await db.get({
            TableName: 'mls-user',
            Key: { email },
        })

        const existingUser = result.Item;

        if (!existingUser) {
            return sendResponse(404, { error: 'User not found' });
        }

        const updateFields = {
            firstname: body.firstname || existingUser.firstname,
            lastname: body.lastname || existingUser.lastname,
            tel: body.tel || existingUser.tel,
            email: existingUser.email,
            password: existingUser.password,
        };
        
        const { error } = userSchema.validate(updateFields, { allowUnknown: true });
        console.log('Validation result:', error);
        if (error) {
            console.error('Validation error:', error.message);
            return sendResponse(400, { error: `Validation Error: ${error.message}` });
        }
        
        const updatedUser = {
            ...existingUser,
            ...updateFields,
        };
        
        const updateParams = {
            TableName: 'mls-user',
            Item: updatedUser,
        };
        
        await db.put(updateParams);
        
        return sendResponse(200, 'User has been updated', updatedUser);
    } catch (error) {
        console.error('Caught error:', error.message);
        return sendResponse(500, { error: 'Internal Server Error' });
    }
})
.use(errorHandler())
.use(validateToken());