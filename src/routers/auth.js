import express from 'express';
import { loginShema, registerShema } from '../validation/user.js';
import { validateBody } from '../middlewares/validateBody.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { loginUserController, logoutUserController, refreshUserSessionController, registerUserController, updateAvatar } from '../controllers/auth.js';
import { authenticate } from '../middlewares/authenticate.js';
import { upload } from '../middlewares/upload.js';

export const authRouter = express.Router();

authRouter.post('/register', validateBody(registerShema), ctrlWrapper(registerUserController));
authRouter.post('/login', validateBody(loginShema), ctrlWrapper(loginUserController));
authRouter.post('/logout', authenticate, ctrlWrapper(logoutUserController));
authRouter.post('/refresh', authenticate, ctrlWrapper(refreshUserSessionController));
authRouter.patch('/avatars', authenticate,
    upload.single('avatar'), ctrlWrapper(updateAvatar));
