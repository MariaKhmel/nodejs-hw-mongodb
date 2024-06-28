import { Router } from 'express';
import { getContactsByIdController, getContactsController, createContactController, deleteContactController, patchContactController } from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createContactSchema, updateContactSchema } from '../validation/contacts.js';
import { authenticate } from '../middlewares/authenticate.js';
import { upload } from "../middlewares/multer.js";

export const contactsRouter = Router();

contactsRouter.use(authenticate);

contactsRouter.get('/', ctrlWrapper(getContactsController));
contactsRouter.get('/:contactId', ctrlWrapper(getContactsByIdController));
contactsRouter.patch('/:contactId', upload.single('photo'), validateBody(updateContactSchema), ctrlWrapper(patchContactController));
contactsRouter.post('/', validateBody(createContactSchema), ctrlWrapper(createContactController));
contactsRouter.delete('/:contactId', ctrlWrapper(deleteContactController));

