import { User } from '../db/models/user.js';
import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { env } from '../utils/env.js';

const SECRET_KEY = env('SECRET_KEY');

export const register = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });


    if (user) {
        next(createHttpError(409, "Email already in use."));
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ ...req.body, password: hashPassword });
    res.status(201).json({
        email: newUser.email,
        name: newUser.name,
    });
};

export const login = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    console.log(user.password);
    if (!user) {
        next(createHttpError(401, "Email or password is invalid."));
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    console.log(passwordCompare);
    if (!passwordCompare) {
        next(createHttpError(401, "Email or password is invalid."));
    }
    const payload = {
        id: user._id,
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
    await User.findByIdAndUpdate(user._id, { token });
    res.json({
        token,
    });
};

export const logout = async (req, res) => {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: "" });
    res.json({
        message: 'Logout successful',
    });
};
