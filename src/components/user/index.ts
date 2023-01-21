import { Router } from "express";
import { login, store } from "./controller";
import { validateAuthorization } from "./middleware";

const userRouter: Router = Router();

userRouter.post("/login", login);
userRouter.post("/", store);


export default userRouter;