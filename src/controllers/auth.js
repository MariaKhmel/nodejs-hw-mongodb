import { User } from '../db/models/user.js';
import createHttpError from 'http-errors';
export const register = async (req, res, next) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        next(createHttpError(409, "Email already in use."));
    }
    const newUser = await User.create(req.body);
    res.status(201).json({
        email: newUser.email,
        name: newUser.name,
    });
};
