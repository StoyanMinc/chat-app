import { Router } from 'express';
import { createMessage } from '../controllers/message-controller.js';

const messagesRouter = Router();

messagesRouter.post('/create-message', createMessage);

export default messagesRouter;