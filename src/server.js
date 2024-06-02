import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { env } from './utils/env.js';
import { getAllContacts, getAllContactsById, } from './services/contacts.js';


const PORT = Number(env('PORT', '3000'));

export const setupServe = () => {
    const app = express();

    app.use(express.json());
    app.use(cors());

    app.use(
        pino({
            transport: {
                target: 'pino-pretty',
            },
        }),
    );

    app.get('/contacts', async (req, res) => {
        console.log('yes');
        const contacts = await getAllContacts();

        res.status(200).json({
            status: 200,
            message: "Successfully found contacts!",
            data: contacts,
        });
    });

    app.get('/contacts/:contactId', async (req, res, next) => {
        try {
            const { contactId } = req.params;
            const contact = await getAllContactsById(contactId);
            if (!contact) {
                const error = new Error('Not Found');
                error.status = 404;
                throw error;
            }
            res.status(200).json({
                status: 200,
                message: `Successfully found contact with id ${contactId}!`,
                data: contact,
            });
        } catch (error) {
            next(error);
        }
    });


    app.use('*', (req, res, next) => {
        console.log('object')
        res.status(404).json({
            message: 'Not found',
        });
    });

    app.use((err, req, res, next) => {
        const { status = 500, message = 'Something went wrong' } = err;
        res.status(status).json({
            message,
            error: err.message,
        });
    });

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};
