import { ONE_DAY } from '../constants/constants.js';
import { loginUser, logoutUser, refreshUsersSession, registerUser, requestResetToken, resetPassword } from '../services/auth.js';

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


export const requestResetEmailController = async (req, res) => {

    await requestResetToken(req.body.email);

    res.json({
        message: 'Reset password email has been successfully sent.',
        status: 200,
        data: {},
    });
};


export const resetPasswordController = async (req, res) => {
    const { refreshToken, sessionId } = req.cookies;

    await resetPassword(req.body, refreshToken, sessionId);


    res.json({
        message: 'Password has been successfully reset.',
        status: 200,
        data: {},
    });
};
