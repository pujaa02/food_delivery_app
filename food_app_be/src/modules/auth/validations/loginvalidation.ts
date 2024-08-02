import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

const validation = Joi.object({
    email: Joi.string().email(),
    password: Joi.string(),
});

export const loginValidation = (req: Request, res: Response, next: NextFunction) => {
    const userloginObj: { email: string, password: string } = req.body;
    const data = validation.validate(userloginObj);
    if (data.error == undefined) {
        next();
    } else {
        return res.status(400).json({ 'Something Went Wrong ': data.error.message });
    }
};
