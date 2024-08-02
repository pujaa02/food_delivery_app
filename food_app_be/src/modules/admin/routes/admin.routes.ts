import { Router } from 'express';
import adminController from '../controller/admin.controller';

export const adminrouter = Router();

adminrouter.route('/getuser/:page/:search').get(adminController.getuserdata);
adminrouter.route('/getrestaurants/:page/:search').get(adminController.getrestaurantsdata);
adminrouter.route('/getmenus/:page/:search').get(adminController.getmenudata);
adminrouter.route('/getratings/:page/:search').get(adminController.getratingsdata);

