import jwt from 'jsonwebtoken';
import 'dotenv/config';

export const validateToken = () => ({
    before: async (handler) => {
        const token = handler.event.headers.authorization && handler.event.headers.authorization.split(' ')[1];
        console.log('validate', token);
        
        if (!token) {
            console.error('No token found');
            throw new Error('Invalid token!');
        }

        try {
            const decodedToken = jwt.verify(token, process.env.SECRET_ACCESS_KEY);

            if (!decodedToken) {
                throw new Error('Invalid token!');
            }

            handler.event.decodedToken = decodedToken;
        } catch (err) {
            console.error('Token verification failed:', err.message);
            throw new Error('Invalid token!');
        }
    }
});
