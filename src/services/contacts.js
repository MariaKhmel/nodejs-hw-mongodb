
import { ContactsCollection } from "../db/models/contact.js";



export const getAllContacts = async () => {
    const contacts = await ContactsCollection.find();
    return contacts;
};

export const getAllContactsById = async (contactId) => {
    const contact = await ContactsCollection.findById(contactId);
    return contact;
};

export const deleteContact = async (contactId) => {
    const contact = await ContactsCollection.findOneAndDelete({
        _id: contactId,
    });

    return contact;
};
