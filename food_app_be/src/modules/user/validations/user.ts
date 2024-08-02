import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { UserAttributes } from '../types/user';

const validation = Joi.object({
    user_id: Joi.number(),
    fname: Joi.string(),
    lname: Joi.string(),
    email: Joi.string().email(),
    phone: Joi.string().length(10),
    gender: Joi.string(),
    bd: Joi.string(),
    password: Joi.string(),
    role_id: Joi.number(),
    city: Joi.string() || " ",
    state: Joi.string() || " ",
    street: Joi.string() || " ",
    pincode: Joi.string() || " ",
});

export const userValidation = (req: Request, res: Response, next: NextFunction) => {
    const userObj: UserAttributes = req.body;
    const data = validation.validate(userObj);

    if (data.error == undefined) {
        next();
    } else {
        return res.status(400).json({ 'Something Went Wrong ': data.error.message });
    }
};
