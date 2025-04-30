import { Router } from "express";
import { login, logout, register } from "../controllers/auth-controller.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const authRouter = Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.get('/logout', authMiddleware, logout);

export default authRouter;
