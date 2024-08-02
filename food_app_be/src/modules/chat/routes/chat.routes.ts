import { Router } from 'express';
import chatController from '../controller/chat.controller';

export const chatrouter = Router();

chatrouter.route('/addchatdata').post(chatController.addchatdata);
chatrouter.route('/getchatdata').get(chatController.getchatdata);