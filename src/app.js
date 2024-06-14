import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'node:path';
import pino from 'pino-http';
import fs from 'node:fs/promises';
import { nanoid } from 'nanoid';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use(
    pino({
        transport: {
            target: 'pino-pretty',
        },
    }),
);


const tempdir = path.join(process.cwd(), 'src', 'temp');
const multerConfig = multer.diskStorage({
    destination: tempdir,
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
const upload = multer({
    storage: multerConfig
});


const books = [];

app.get('/api/books', async (req, res) => {
    res.json(books);
});

const booksDir = path.join(process.cwd(), 'src', 'public', 'books');

app.post('/api/books', upload.single("cover"), async (req, res) => {
    const { path: tempUpload, originalname } = req.file;
    const resultUpload = path.join(booksDir, originalname);
    await fs.rename(tempUpload, resultUpload);

    const cover = path.join('books', originalname);

    const newBook = {
        id: nanoid(),
        ...req.body,
        cover,
    };

    books.push(newBook);

    res.status(201).json(newBook);

});

app.listen(3000, () => {
    console.log('app server');
});
