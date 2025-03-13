import middy from '@middy/core';
import { errorHandler } from '../../middlewares/errorHandler.mjs';
import { sendResponse } from '../../response/index.mjs';
import { db } from '../../services/index.mjs';
import { userSchema } from '../../models/userSchema.mjs';
import { hashpassword } from '../../utils/index.mjs';

export const handler = middy(async (event) => {
    console.log('Received event:', JSON.stringify(event, null, 2));
    try {
        let body = event.body;

        if (typeof body === 'string') {
            body = JSON.parse(event.body);
        }

        const { password, email } = body;

        const { error } = userSchema.validate(body);
        console.log('Validation result:', error);
        if (error) {
            console.error('Validation error:', error.message);
            return sendResponse(400, { error: `Validation Error: ${error.message}` });
        }

        if ( password === "admin") {
            console.error("Admin is not allowed");
            throw new Error("Admin is not allowed"); 
        }

        if (!email || !password) {
            console.error('Missing required fields');
            throw new Error('Missing required fields: password and role');
        }

        const paramsEmail = {
            TableName: 'mls-user',
            Key: { email },
        };

        const resultEmail = await db.get(paramsEmail);
        if (resultEmail.Item) {
            console.error('Email already exists');
            return sendResponse(400, { error: 'Email is already registered' });
        }

        const newUser = {
            email: email,
            password: await hashpassword(password),
        };

        const params = {
            TableName: 'mls-user',
            Item: newUser,
        };

        await db.put(params);

        return sendResponse(200, { message: 'User added successfully', user: newUser });
    } catch (error) {
        console.error('Error during user creation:', error);
        return sendResponse(500, { error: 'Internal Server Error' });
    }
}).use(errorHandler());