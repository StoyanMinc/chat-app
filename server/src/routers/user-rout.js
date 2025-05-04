import { Router } from "express";
import { getAllUsers, getOneUser, getOnlineUsers } from "../controllers/user-controller.js";

const userRouter = Router();

userRouter.get('/get-users', getAllUsers);
userRouter.get('/get-user', getOneUser);
userRouter.get('/get-online-users', getOnlineUsers);

export default userRouter;