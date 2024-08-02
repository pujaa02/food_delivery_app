import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";


const senFormVal = [
    body("senTitle").trim().notEmpty().withMessage("event title is required"),
    body("senDesc").trim().notEmpty().withMessage("description is required"),
    body('eventImgs').custom((value, { req }) => {
        if (!req.files) {
            throw new Error("file must be uploaded")
        }
        const filTypes = /jpeg|jpg|png|gif/;
        req.files.forEach((element: { size: number; mimetype: string; }) => {
            if (element.size > 200000) {
                throw new Error("maximum size of file must be less than 200 kb");
            }
            const mimeType = filTypes.test(element.mimetype)
            if (!mimeType) {
                throw new Error("Invalid file type");
            }
        });
        return true;
    })
]

const handleValerrors = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(), isError: true });
    }
    next();
}

export default { senFormVal, handleValerrors };