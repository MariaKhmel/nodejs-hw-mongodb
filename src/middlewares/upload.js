import multer from 'multer';
import path from 'node:path';

const tempdir = path.join(process.cwd(), 'src', 'temp');
console.log(tempdir);
const multerConfig = multer.diskStorage({
    destination: tempdir,
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
export const upload = multer({
    storage: multerConfig
});
