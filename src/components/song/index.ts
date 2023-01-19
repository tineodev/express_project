import { Router } from "express";
import { getSong, postSong } from "./controller";

const routerSong: Router = Router();

routerSong.get("/", getSong);
routerSong.post("/", postSong);

export default routerSong;
