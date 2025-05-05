import { Router } from "express";
import { getAllUsers, getOneUser, getOnlineUsers } from "../controllers/user-controller.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const userRouter = Router();

userRouter.get('/get-users', authMiddleware, getAllUsers);
userRouter.get('/get-user', authMiddleware, getOneUser);
userRouter.get('/get-online-users', authMiddleware, getOnlineUsers);

export default userRouter;