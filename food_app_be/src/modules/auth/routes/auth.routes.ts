import { Router } from 'express';
import authController from '../controller/auth.controller';

export const authrouter = Router();


authrouter.route("/getLoggedIn").post(authController.getLoggedIn);
