import jwt from 'jsonwebtoken';
import { Response, NextFunction, Request } from 'express';
import dotenv from 'dotenv';
import { AUTHEN_ERR, INVALID_TOKEN } from '../constants/Auth';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET as string;

export const authen = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json(AUTHEN_ERR);
    }
    try {
        const decodedToken = await jwt.verify(token, JWT_SECRET) as { userId: number };
        (req as any).userId = decodedToken.userId;
        next();
    } catch (err: any) {
        console.log('Authentication middleware false: ', err.message);
        return res.status(403).json(INVALID_TOKEN);
    }
};