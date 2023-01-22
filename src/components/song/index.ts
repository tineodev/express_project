import { Router } from "express";
import { getSong, postSong, getSongID } from "./controller";

const routerSong: Router = Router();

routerSong.get("/", getSong);
routerSong.get("/:id", getSongID);
routerSong.post("/", postSong);

export default routerSong;
