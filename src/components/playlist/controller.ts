import type { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getPlaylist = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const element = await prisma.playlist.findMany({
      include: { songs: true },
    });
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
        songs: {
          connect: datos.songs.map((song: any) => ({ id: song.id })),
        },
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
    console.log(error);
  }
};

export const updatePlaylist = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const data = req.body;
    if (!data.id_playlist || !data.id_song) {
      throw new Error("Both id_playlist and id_song are required");
    }

    const element = await prisma.playlist.update({
      where: { id: data.id_playlist },
      data: {
        songs: {
          connect: { id: data.id_song },
        },
      },
    });

    res.status(201).json({
      ok: true,
      message: "Playlist successfully updated",
      element:element
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: error,
    });
  }
};

export const deletePlaylist = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const data = req.body;

    const element = await prisma.playlist.delete({
      where: {
        id: data.id,
      },
    });

    res.status(201).json({
      ok: true,
      message: "Playlist successfully deleted",
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: error,
    });
  }
};
