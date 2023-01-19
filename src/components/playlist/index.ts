import { Router } from "express";
import { getPlaylist } from "./controller";

const routerPlaylist = Router();

routerPlaylist.get("/", getPlaylist);
// routerPlaylist.post("/");

export default routerPlaylist;
