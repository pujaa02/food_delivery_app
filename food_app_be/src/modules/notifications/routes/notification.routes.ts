import { Router } from "express";
import notificationController from "../controller/notification.controller";

export const notificationrouter = Router();

notificationrouter.route('/fetchnotification/:driver_id').get(notificationController.fetchnotifications);
notificationrouter.route('/showorderdata/:order_id').get(notificationController.showorderdata);
notificationrouter.route('/acceptorder/:driver_id/:order_id').get(notificationController.acceptorder);