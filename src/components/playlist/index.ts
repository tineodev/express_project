import { Router } from "express";
import {
  getPlaylist,
  postPlaylist,
  deletePlaylist,
  updatePlaylist,
} from "./controller";

const routerPlaylist = Router();

routerPlaylist.get("/", getPlaylist);
routerPlaylist.post("/", postPlaylist);
routerPlaylist.put("/", updatePlaylist);
routerPlaylist.delete("/", deletePlaylist);

export default routerPlaylist;
