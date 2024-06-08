import express from 'express';
import router from './contacts.js';
import { registerShema } from '../validation/user.js';
import { validateBody } from '../middlewares/validateBody.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { register } from '../controllers/auth.js';
import { User } from '../db/models/user.js';

export const authRouter = express.Router();


authRouter.post('/register', validateBody(registerShema), ctrlWrapper(register));
