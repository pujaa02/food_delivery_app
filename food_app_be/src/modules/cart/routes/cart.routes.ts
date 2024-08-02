import { Router } from 'express';
import cartController from '../controller/cart.controller';

export const cartrouter = Router();

cartrouter.route('/addtocart/:user_id').post(cartController.addtocart);
cartrouter.route('/getcarddata/:user_id').get(cartController.getcarddata);
cartrouter.route('/removecartdata/:user_id').get(cartController.removecartdata);
