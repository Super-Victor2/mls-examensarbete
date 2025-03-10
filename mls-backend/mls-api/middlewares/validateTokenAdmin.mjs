import jwt from 'jsonwebtoken';
import 'dotenv/config';

export const validateTokenAdmin = () => ({
    before: async (handler) => {
        const token = handler.event.headers.authorization && handler.event.headers.authorization.split(' ')[1];
        console.log('validate', token);

        if (!token) {
            console.error('No token found');
            throw new Error('Invalid token!');
        }

        try {
            const decodedToken = jwt.verify(token, process.env.SECRET_ACCESS_KEY);
            console.log('Decoded token:', decodedToken);

            if (decodedToken.isAdmin === true) {
                console.log('User is an admin');
            } else {
                console.error('User is not an admin');
                throw new Error('User is not an admin!');
            }

            return;
        } catch (error) {
            console.error('Error with token verification:', error.message);
            throw new Error('Invalid token or token is expired');
        }
    }
});