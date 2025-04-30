import {Router} from 'express'
import authRouter from './routers/auth-rout.js';
import userRouter from './routers/user-rout.js';
import messagesRouter from './routers/messages.rout.js'

const router = Router();

router.use(authRouter);
router.use(userRouter);
router.use(messagesRouter);


export default router;