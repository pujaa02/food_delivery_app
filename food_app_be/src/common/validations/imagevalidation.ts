
import { Request, Response, NextFunction } from "express";
import {  ValidationChain,  body, validationResult } from "express-validator";

const fileValidateMiddleware: ValidationChain[] = [
    body('image').custom((value, { req }) => {

        if (!req.file) {
            throw new Error("File must be uploaded");
        }
        const fileTypes = /jpeg|jpg|gif/;
        if (req.file.size > 200000) {
            throw new Error("Maximum file size is 200 KB");
        }
        const mimeType = fileTypes.test(req.file.mimetype);
        if (!mimeType) {
            throw new Error("Invalid file type");
        }
        return true;
        // next();
    })
];


const handleValidatorErrors = (req: Request, res: Response, next: NextFunction) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).json({errors: result.array() , isError: true, message: "Validation error" });
    }
    next();
}

export default { fileValidateMiddleware, handleValidatorErrors };