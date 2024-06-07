import Joi from 'joi';

export const createContactSchema = Joi.object({
    name: Joi.string().min(3).max(30).required().messages({
        'string.min': 'Name should have at least 3 characters',
        'string.max': 'Name should have at most 30 characters',
        'any.required': 'Name is required',
    }),
    phoneNumber: Joi.string().min(6).max(16).required().messages({
        'string.min': 'PhoneNumber should have at least 6 characters',
        'string.max': 'PhoneNumber should have at most 16 characters',
        'any.required': 'PhoneNumber is required',
    }),
    email: Joi.string().email(),
    isFavourite: Joi.boolean().messages({
        'base': 'isFavourite should be a boolean',
    }),
    contactType: Joi.string().valid('home', 'personal', 'work').messages({
        'valid': 'Only "home", "personal", "work" are possible options.',
    }),
});

export const updateContactSchema = Joi.object({
    name: Joi.string().min(3).max(30).messages({
        'string.min': 'Name should have at least 3 characters',
        'string.max': 'Name should have at most 30 characters',
    }),
    phoneNumber: Joi.string().min(6).max(16).messages({
        'string.min': 'PhoneNumber should have at least 6 characters',
        'string.max': 'PhoneNumber should have at most 16 characters',
    }),
    email: Joi.string().email(),
    isFavourite: Joi.boolean().messages({
        'base': 'isFavourite should be a boolean',
    }),
    contactType: Joi.string().valid('home', 'personal', 'work').messages({
        'valid': 'Only "home", "personal", "work" are possible options.',
    }),
});
