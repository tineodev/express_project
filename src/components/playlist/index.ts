import { Router } from "express";
import { getPlaylist, postPlaylist,deletePlaylist } from "./controller";

const routerPlaylist = Router();

routerPlaylist.get("/", getPlaylist);
routerPlaylist.post("/", postPlaylist);
routerPlaylist.delete("/", deletePlaylist);

export default routerPlaylist;
