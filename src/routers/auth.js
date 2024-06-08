import express from 'express';
import router from './contacts.js';
import { loginShema, registerShema } from '../validation/user.js';
import { validateBody } from '../middlewares/validateBody.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { login, logout, register } from '../controllers/auth.js';
import { User } from '../db/models/user.js';
import { getCurrent } from '../controllers/contacts.js';
import { authentificate } from '../middlewares/authenificate.js';

export const authRouter = express.Router();


authRouter.post('/register', validateBody(registerShema), ctrlWrapper(register));
authRouter.post('/login', validateBody(loginShema), ctrlWrapper(login));
authRouter.get('/current', authentificate, ctrlWrapper(getCurrent));
authRouter.post('/logout', authentificate, ctrlWrapper(logout));
