import express from 'express';
import pino from 'pino-http';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { env } from './utils/env.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import router from './routers/index.js';


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
    app.use(cookieParser());


    app.use(express.static('public'));
    app.use(router);


    app.use('*', notFoundHandler);

    app.use(errorHandler);



    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};
