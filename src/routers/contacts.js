import { Router } from 'express';
import { getContactsByIdController, getContactsController, createContactController, deleteContactController, patchContactController } from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createContactSchema, updateContactSchema } from '../validation/contacts.js';

const router = Router();
router.get('/', ctrlWrapper(getContactsController));
router.get('/:contactId', ctrlWrapper(getContactsByIdController));
router.patch('/:contactId', validateBody(updateContactSchema), ctrlWrapper(patchContactController));
router.post('/', validateBody(createContactSchema), ctrlWrapper(createContactController));
router.delete('/:contactId', ctrlWrapper(deleteContactController));
export default router;

