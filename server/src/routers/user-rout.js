import { Router } from "express";
import { getAllUsers } from "../controllers/user-controller.js";

const userRouter = Router();

userRouter.get('/get-users', getAllUsers);

export default userRouter;