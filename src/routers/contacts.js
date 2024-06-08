import { Router } from 'express';
import { getContactsByIdController, getContactsController, createContactController, deleteContactController, patchContactController } from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createContactSchema, updateContactSchema } from '../validation/contacts.js';
import { authentificate } from '../middlewares/authenificate.js';

const router = Router();
router.get('/', authentificate, ctrlWrapper(getContactsController));
router.get('/:contactId', authentificate, ctrlWrapper(getContactsByIdController));
router.patch('/:contactId', authentificate, validateBody(updateContactSchema), ctrlWrapper(patchContactController));
router.post('/', authentificate, validateBody(createContactSchema), ctrlWrapper(createContactController));
router.delete('/:contactId', authentificate, ctrlWrapper(deleteContactController));
export default router;

