import { Router } from 'express';
export const menurouter = Router();
import multer from 'multer';
import storage from '../../../middlewares/multer';
import imagevalidation from '../../../common/validations/imagevalidation';
import { menuvalidations } from '../validations/menu';
import menuController from '../controller/menu.controller';


const upload = multer({
    storage: storage,
});

menurouter.route('/addmenu/:restaurant_id').post(upload.single('image'), imagevalidation.handleValidatorErrors, menuvalidations, menuController.addmenu);

menurouter.route('/updatemenu/:menu_id').post(upload.single('image'), imagevalidation.handleValidatorErrors, menuvalidations, menuController.updatemenu);

menurouter.route('/removemenu/:menu_id').get(menuController.removemenu);
menurouter.route('/fetchmenudata/:menu_id').get(menuController.fetchmenudata);
menurouter.route('/findrestaurant/:name').get(menuController.findrestaurantwithmenu);
menurouter.route('/fetchmenubyrestaurant/:restaurant_id').get(menuController.fetchmenubyrestaurant);

menurouter.route('/addbulkdata/:restaurant_id').post(menuController.addbulkdata);