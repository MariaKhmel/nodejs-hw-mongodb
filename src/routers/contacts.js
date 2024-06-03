import { Router } from 'express';
import { getContactsByIdController, getContactsController, deleteContactController } from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();
router.get('/contacts', ctrlWrapper(getContactsController));
router.get('/contacts/:contactId', ctrlWrapper(getContactsByIdController));
router.delete('/contacts/:contactId', ctrlWrapper(deleteContactController));
export default router;

