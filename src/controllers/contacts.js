import mongoose from "mongoose";
import { deleteContact, getAllContacts, getAllContactsById } from "../services/contacts.js";
import { throwNotFoundError } from "../utils/error.js";
import createHttpError from 'http-errors';

export const getContactsController = async (req, res) => {
    const contacts = await getAllContacts();

    res.status(200).json({
        status: 200,
        message: "Successfully found contacts!",
        data: contacts,
    });
};

export const getContactsByIdController = async (req, res, next) => {
    const { contactId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(contactId)) {
        throwNotFoundError();
    }
    const contact = await getAllContactsById(contactId);

    if (!contact) {
        next(createHttpError(404, "Contact not found"));
        return;
    }
    res.status(200).json({
        status: 200,
        message: `Successfully found contact with id ${contactId}!`,
        data: contact,
    });
};


export const deleteContactController = async (req, res, next) => {
    const { contactId } = req.params;
    const contact = await deleteContact(contactId);

    if (!contact) {
        next(createHttpError(404, "Contact not found"));
        return;
    }
    res.status(204).send();

};
