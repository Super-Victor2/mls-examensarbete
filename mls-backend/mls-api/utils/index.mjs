import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const saltRounds = 10;

export const hashpassword = async (password) => {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
};

export const comparePasswords = async (password, storedPassword) => {
    const isEqual = await bcrypt.compare(password, storedPassword);
    return isEqual;
};

export const generateJWT = (user) => {
    const payload = {
        username: user.username,
        email: user.email,
        isAdmin: user.username === 'admin'
    };

    const token = jwt.sign(payload, process.env.SECRET_ACCESS_KEY, { expiresIn: '1h' });

    return token;
};