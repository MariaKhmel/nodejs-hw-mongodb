import createHttpError from 'http-errors';
import mongoose from "mongoose";

const { Schema, model } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },

}, { versionKey: false, timestamps: true })

// // middleware
// userSchema.post('save', (err, data, next) => {
//     const { name, code } = err;
//     const status = (name === 'MongoServerError' && code === 11000) ? 409 : 400;
//     err.status = status;
//     next(createHttpError(err.status, "Contact not found"));
// });

export const UsersCollection = model('user', userSchema);
