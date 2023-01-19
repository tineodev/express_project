import type { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const postSong = async (req: Request, res: Response): Promise<void> => {
  try {
    const datos = req.body;

    const element = await prisma.song.create({
      data: {
        name: datos.name,
        artist: datos.artist,
        album: datos.album,
        year: datos.year,
        genre: datos.genre,
        duration: datos.duration,
      },
    });

    res.status(201).json({
      ok: true,
      message: "Song successfully created",
      element: element,
    });
  } catch (error) {
    res.status(500).json({ ok: false, message: error });
  }
};

export const getSong = async (req: Request, res: Response): Promise<void> => {
  try {
    const element = await prisma.song.findMany();
    res.status(200).json(element);
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: error,
    });
  }
};

export async function getExistSong(res: Response, idSong: string) {
  const element = await prisma.song.findUnique({
    where: { id: parseInt(idSong) },
  });

  res.json(element);
}