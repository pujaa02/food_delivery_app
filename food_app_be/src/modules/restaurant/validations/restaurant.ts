import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { RestaurantAttributes } from '../types/restaurant.types';


const validation = Joi.object({
    user_id: Joi.number(),
    name: Joi.string(),
    phone: Joi.string().length(10),
    address: Joi.string(),
    image: Joi.string(),
});

export const restaurantvalidation = (req: Request, res: Response, next: NextFunction) => {
    const restobj: RestaurantAttributes = req.body;
    const data = validation.validate(restobj);
    if (data.error == undefined) {
        next();
    } else {
        return res.status(400).json({ 'Something Went Wrong ': data.error.message });
    }
}