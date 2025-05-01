import { Router } from 'express';
import { createMessage, getChatMessages } from '../controllers/message-controller.js';

const messagesRouter = Router();

messagesRouter.post('/create-message', createMessage);
messagesRouter.get('/get-chat-messages', getChatMessages);

export default messagesRouter;