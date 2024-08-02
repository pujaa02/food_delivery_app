import { Router } from 'express';
import userController from '../controller/user.controller';


export const userrouter = Router();

userrouter.route('/getalldata').get(userController.getalldata);
userrouter.route('/update/:user_id').post(userController.updateuser);
userrouter.route('/delete/:user_id').get(userController.deleteuser);

