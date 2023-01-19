import { Router } from "express";
import { getPlaylist, postPlaylist } from "./controller";

const routerPlaylist = Router();

routerPlaylist.get("/", getPlaylist);
routerPlaylist.post("/", postPlaylist);

export default routerPlaylist;
