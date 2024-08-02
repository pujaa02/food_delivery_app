import { NextFunction, Request, Response } from 'express';
import { MenuAttributes } from '../types/menu.types';
import Joi from 'joi';


const validation = Joi.object({
    id: Joi.number() || null,
    restaurant_id: Joi.number() || null,
    item_name: Joi.string() || "",
    price: Joi.number() || null,
    image: Joi.string() || "",
    description: Joi.string() || "",
    count: Joi.number() || null,
    createdAt: Joi.string() || "",
    updatedAt: Joi.string() || "",
    deletedAt: Joi.string() || "",
});

export const menuvalidations = (req: Request, res: Response, next: NextFunction) => {
    const restobj: MenuAttributes = req.body;
    const data = validation.validate(restobj);
    if (data.error == undefined) {
        next();
    } else {
        return res.status(400).json({ 'Something Went Wrong ': data.error.message });
    }
}