import mongoose from "mongoose";
import { createContact, deleteContact, getAllContacts, getAllContactsById, updateContact } from "../services/contacts.js";
import { throwNotFoundError } from "../utils/error.js";
import createHttpError from 'http-errors';
import { parsePaginationParams } from "../utils/parsePaginationParams.js";
import { parseSortParams } from "../utils/parseSortParams.js";
import { parseFilterParams } from '../utils/parseFilterParams.js';

export const getContactsController = async (req, res) => {
    const { page, perPage } = parsePaginationParams(req.query);
    const { sortBy, sortOrder } = parseSortParams(req.query);
    const filter = parseFilterParams(req.query);

    const contacts = await getAllContacts({
        page,
        perPage,
        sortBy,
        sortOrder,
        filter,
    });

    res.status(200).json({
        status: 200,
        message: "Successfully found contacts!",
        data: contacts,
    });
};

export const getContactsByIdController = async (req, res, next) => {
    // const { contactId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(req.user._id)) {
        throwNotFoundError();
    }
    const contact = await getAllContactsById(req.user._id);

    if (!contact) {
        next(createHttpError(404, "Contact not found"));
        return;
    }
    res.status(200).json({
        status: 200,
        message: `Successfully found contact with id ${req.user._id}!`,
        data: contact,
    });
};

export const createContactController = async (req, res) => {
    const contact = await createContact(req.body);
    res.status(201).json({
        status: 201,
        message: "Successfully created a contact!",
        data: contact,
    });
};

export const patchContactController = async (req, res, next) => {
    const { contactId } = req.params;
    const result = await updateContact(contactId, req.body);
    if (!result) {
        next(createHttpError(404, "Contact not found"));
        return;
    }

    res.json({
        status: 200,
        message: "Successfully patched a contact!",
        data: result,
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
