import { Router } from 'express';
import homeController from '../controller/home.controller';
export const homerouter = Router();

homerouter.route('/findmenuall').get(homeController.fetchallmenu);
homerouter.route('/toprestaurant').get(homeController.toprestaurant);
homerouter.route('/fetchmenuitems/:item').get(homeController.fetchmenuitems);
homerouter.route('/getrestaurantallmenu/:id').get(homeController.getrestaurantallmenu);