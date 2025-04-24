import {Router} from 'express'
import authRouter from './routers/auth-routs.js';

const router = Router();

router.use(authRouter);


export default router;