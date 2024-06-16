import { ONE_DAY } from '../constants/constants.js';
import { loginUser, logoutUser, refreshUsersSession, registerUser } from '../services/auth.js';
import gravatar from 'gravatar';
import path from 'node:path';
import fs from 'node:fs/promises';
import { nanoid } from 'nanoid';
import { UsersCollection } from '../db/models/user.js';

const avatarDir = path.join(process.cwd(), 'src', 'public', 'avatars');

export const registerUserController = async (req, res) => {
    const user = await registerUser(req.body);
    res.status(201).json({
        status: 201,
        message: 'Successfully registered a user!',
        data: user,
    });
};


export const loginUserController = async (req, res) => {
    const session = await loginUser(req.body);

    res.cookie('refreshToken', session.refreshToken, {
        httpOnly: true,
        expires: new Date(Date.now() + ONE_DAY),
    });
    res.cookie('sessionId', session._id, {
        httpOnly: true,
        expires: new Date(Date.now() + ONE_DAY),
    });

    res.json({
        status: 200,
        message: 'Successfully logged in an user!',
        data: {
            accessToken: session.accessToken,
        },
    });
};
export const logoutUserController = async (req, res) => {
    console.log('logout');
    if (req.cookies.sessionId) {
        await logoutUser(req.cookies.sessionId);
    }

    res.clearCookie('sessionId');
    res.clearCookie('refreshToken');

    res.status(204).send();
};


const setupSession = (res, session) => {
    res.cookie('refreshToken', session.refreshToken, {
        httpOnly: true,
        expires: new Date(Date.now() + ONE_DAY),
    });
    res.cookie('sessionId', session._id, {
        httpOnly: true,
        expires: new Date(Date.now() + ONE_DAY),
    });
};

export const refreshUserSessionController = async (req, res) => {
    console.log(req.cookies);
    const session = await refreshUsersSession({
        sessionId: req.cookies.sessionId,
        refreshToken: req.cookies.refreshToken,
    });


    setupSession(res, session);

    res.json({
        status: 200,
        message: 'Successfully refreshed a session!',
        data: {
            accessToken: session.accessToken,
        },
    });
};


export const updateAvatar = async (req, res) => {
    try {
        const { path: tempUpload, originalname } = req.file;
        const resultUpload = path.join(avatarDir, originalname);
        await fs.rename(tempUpload, resultUpload);
    } catch (error) {
        await fs.unlink(tempUpload);
    }

};


// const { _id } = req.user;
// const { path: tempUpload, originalname } = req.file;
// const filename = `${_id}${originalname}`;
// const resultUpload = path.join(avatarDir, filename);
// await fs.rename(tempUpload, resultUpload);

// const avatarUrl = path.join('avatars', filename);
// await UsersCollection.findByIdAndUpdate(_id, { avatarUrl });

// res.json({
//     avatarUrl,
// });
