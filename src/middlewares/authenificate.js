import createHttpError from 'http-errors';
import jwt from 'jsonwebtoken';
import { env } from '../utils/env.js';
import { User } from '../db/models/user.js';

const SECRET_KEY = env('SECRET_KEY');

export const authentificate = async (req, res, next) => {
    const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(" ");
    if (bearer !== 'Bearer') {
        next((401, createHttpError("Not authorized.")));
    }
    try {
        const { id } = jwt.verify(token, SECRET_KEY);
        const user = await User.findById(id);
        if (!user || user.token || user.token !== token) {
            next((401, createHttpError("Not authorized.")));
        }
        req.user = user;
        next();
    } catch {
        next((401, createHttpError("Not authorized.")));
    }

};
