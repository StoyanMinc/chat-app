import { Router } from 'express';
import { createMessage, getChatMessages } from '../controllers/message-controller.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const messagesRouter = Router();

messagesRouter.post('/create-message', createMessage);
messagesRouter.get('/get-chat-messages', authMiddleware, getChatMessages);

export default messagesRouter;