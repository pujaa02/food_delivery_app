import { Router } from 'express';
import driverController from '../controller/driver.controller';

export const driverrouter = Router();

driverrouter.route('/removedriver/:driver_id').get(driverController.removedriver);
driverrouter.route('/fetchdriver/:user_id').get(driverController.fetchdriver);
driverrouter.route('/fetchdashboarddata/:driver_id').get(driverController.fetchdashboarddata);
