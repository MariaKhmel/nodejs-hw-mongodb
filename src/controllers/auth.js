import { User } from '../db/models/user.js';
import createHttpError from 'http-errors';
import { createHashPassword } from '../services/auth.js';

export const register = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    console.log(user);
    console.log(Boolean(user));
    if (user) {
        next(createHttpError(409, "Email already in use."));
    }
    const hashPassword = createHashPassword(password);
    const newUser = await User.create({ ...req.body, password: hashPassword });
    res.status(201).json({
        email: newUser.email,
        name: newUser.name,
    });
};
