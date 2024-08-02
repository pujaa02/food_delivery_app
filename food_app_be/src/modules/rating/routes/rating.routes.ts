import { Router } from 'express';
import ratingController from '../controller/rating.controller';


export const ratingrouter = Router();

ratingrouter.route('/addrating/:user_id/:restaurant_id').post(ratingController.addrating);
ratingrouter.route('/fetchrating').get(ratingController.fetchrating);

