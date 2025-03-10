import middy from '@middy/core';
import { errorHandler } from '../../middlewares/errorHandler.mjs';
import { sendResponse, sendResponseWithHeaders } from '../../response/index.mjs';
import { db } from '../../services/index.mjs';
import { userSchema } from '../../models/userSchema.mjs';
import { comparePasswords, hashpassword, generateJWT } from '../../utils/index.mjs';

export const handler = middy(async (event) => {
    console.log('Received event:', JSON.stringify(event, null, 2));
    try {
        let body = event.body;
        if (typeof body === 'string') {
            body = JSON.parse(event.body);
        }

        const { username, password, email } = body || {};

        if (!username || !password || !email) {
            console.error('Missing required fields');
            return sendResponse(400, { error: 'Missing required fields: username, password, and email' });
        }

        const { error } = userSchema.validate(body);
        console.log('Validation result:', error);
        if (error) {
            console.error('Validation error:', error.message);
            return sendResponse(400, { error: `Validation Error: ${error.message}` });
        }

        const params = {
            TableName: 'mls-user',
            Key: { email },
        };

        const result = await db.get(params);
        const existingUser = result.Item;

        if (!existingUser) {
            console.error('User not found');
            return sendResponse(404, { error: 'User not found' });
        }

        const isPasswordCorrect = await comparePasswords(password, existingUser.password);
        const isEmailCorrect = existingUser.email === email;
        const isUsernameCorrect = existingUser.username === username;

        if (!isPasswordCorrect || !isEmailCorrect || !isUsernameCorrect) {
            console.error('Invalid credentials');
            return sendResponse(401, { error: 'Invalid username, password, or email' });
        }

        const adminUser = {
            username: "admin",
            password: await hashpassword("admin"),
            email: email,
        };

        const isEqual = await comparePasswords(password, adminUser.password);

        if (username === 'admin' && (password !== adminUser.username || !isEqual)) {
            console.error('Invalid admin credentials or permission denied');
            throw new Error('Invalid admin credentials or permission denied');
        }

        const token = generateJWT(body);
        console.log('token', token);

        const newLogin = {
            username,
            password,
            email,
        };

        return sendResponseWithHeaders(200, { message: 'Login successful', newLogin, token });
    } catch (error) {
        console.error('Error during login:', error);
        return sendResponse(500, { error: 'Internal Server Error' });
    }
}).use(errorHandler());
