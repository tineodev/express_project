import { Router } from "express";
import { login, store } from "./controller";

const userRouter: Router = Router();

userRouter.post("/login", login);
userRouter.post("/", store);


export default userRouter;