import mongoose from "mongoose";

const { Schema, model } = mongoose;

const contactSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: false,
    },
    isFavourite: {
        type: Boolean,
        default: true,
    },
    contactType: {
        type: String,
        required: true,
        enum: ['home', 'personal', 'work'],
        default: 'personal',
    },
    createdAt: String,
    updatedAt: String,
},
    { timestamps: true, versionKey: false },
);

//this is middleware
contactSchema.post("save", (err, data, next) => {
    err.status = 400;
    next();
});

export const ContactsCollection = model('contacts', contactSchema);
