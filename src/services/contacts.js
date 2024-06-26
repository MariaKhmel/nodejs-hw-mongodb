
import { SORT_ORDER } from "../constants/constants.js";
import { ContactsCollection } from "../db/models/contact.js";
import { calculatePaginationData } from "../utils/calculatePaginationData.js";

export const getAllContacts = async ({ page = 1, perPage = 10, sortOrder = SORT_ORDER.ASC,
    sortBy = '_id', filter = {}, }) => {

    const limit = perPage;
    const skip = (page - 1) * perPage;

    const contactsQuery = ContactsCollection.find();
    if (filter.isFavourite) {
        contactsQuery.where('isFavourite').equals(filter.isFavourite);
    }
    if (filter.contactType) {
        contactsQuery.where('contactType').equals(filter.contactType);
    }


    const contactsCount = await ContactsCollection.find()
        .merge(contactsQuery)
        .countDocuments();

    const contacts = await contactsQuery.skip(skip).limit(limit).sort({ [sortBy]: sortOrder })
        .exec();


    const paginationData = calculatePaginationData(contactsCount, perPage, page);

    return {
        data: contacts,
        ...paginationData,
    };
};

export const getAllContactsById = async (id, userId) => {

    const contact = await ContactsCollection.findOne({ _id: id });
    return contact;
};

export const createContact = async (payload) => {
    const contact = await ContactsCollection.create(payload);
    return contact;
};

export const updateContact = async (contactId, payload, options = {}) => {
    const contact = await ContactsCollection.findOneAndUpdate(
        { _id: contactId },
        payload,
        {
            new: true,
            includeResultMetadata: true,
            ...options,
        },
    );

    if (!contact || !contact.value) return null;

    return contact.value;
};

export const deleteContact = async (contactId) => {
    const contact = await ContactsCollection.findOneAndDelete({
        _id: contactId,
    });

    return contact;
};
