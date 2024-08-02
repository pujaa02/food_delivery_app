import multer from "multer";
import fs from "fs";
import path from "path"

export const fileOrFolderExistCheck = (path: string) => {
    if (fs.existsSync(path)) {
        return true;
    } else {
        fs.mkdirSync(path, { recursive: true });
        return true;
    }
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        fileOrFolderExistCheck(path.join(__dirname, '../../public/uploads'));
        return cb(null, path.join(__dirname, '../../public/uploads'));
    },
    filename: function (req, file: Express.Multer.File, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        return cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname);
    }
});


export default storage;

