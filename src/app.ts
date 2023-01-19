import express, { type Application } from "express";
import { userRouter,routerSong, routerPlaylist } from "./components";



const app: Application = express();

app.use(express.json());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/songs", routerSong);
app.use("/api/v1/playlists", routerPlaylist);

export default app;