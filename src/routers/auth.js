import express from 'express';
import { loginShema, registerShema } from '../validation/user.js';
import { validateBody } from '../middlewares/validateBody.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { loginUserController, logoutUserController, refreshUserSessionController, registerUserController, requestResetEmailController, resetPasswordController } from '../controllers/auth.js';
import { authenticate } from '../middlewares/authenticate.js';
import { requestResetEmailSchema, resetPasswordSchema } from '../validation/auth.js';


export const authRouter = express.Router();

authRouter.post('/register', validateBody(registerShema), ctrlWrapper(registerUserController));
authRouter.post('/login', validateBody(loginShema), ctrlWrapper(loginUserController));
authRouter.post('/logout', authenticate, ctrlWrapper(logoutUserController));
authRouter.post('/refresh', authenticate, ctrlWrapper(refreshUserSessionController));
authRouter.post('/send-reset-email', validateBody(requestResetEmailSchema), ctrlWrapper(requestResetEmailController));
authRouter.post('/reset-pwd', validateBody(resetPasswordSchema), ctrlWrapper(resetPasswordController));
