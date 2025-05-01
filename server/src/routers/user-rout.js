import { Router } from "express";
import { getAllUsers, getOneUser } from "../controllers/user-controller.js";

const userRouter = Router();

userRouter.get('/get-users', getAllUsers);
userRouter.get('/get-user', getOneUser);
export default userRouter;