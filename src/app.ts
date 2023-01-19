import express, { type Application } from "express";
import { userRouter } from "./components";



const app: Application = express();

app.use(express.json());

app.use("/api/v1/users", userRouter);

export default app;