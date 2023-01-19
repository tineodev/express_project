import type { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { getExistSong } from "../song/controller";

const prisma = new PrismaClient();

export const getPlaylist = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const element = await prisma.playlist.findMany();
    res.status(200).json(element);
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: error,
    });
  }
};

export const postPlaylist = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const datos = req.body;

    const element = await prisma.playlist.create({
      data: {
        name: datos.name,
        authorID: datos.user_id,
        songs: datos.songs,
      },
    });

    res.status(201).json({
      ok: true,
      message: "Playlist successfully created",
      element: element,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: error,
    });
  }
};
