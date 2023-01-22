import type { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

var userLogin = require("../user/controller");

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
        public: datos.public,
      },
    });

    res.status(201).json({
      ok: true,
      message: "Song successfully created",
      results: element,
    });
  } catch (error) {
    res.status(500).json({ ok: false, message: error });
  }
};

export const getSong = async (req: Request, res: Response): Promise<void> => {
  try {
    if (userLogin.accessUser) {
      const element = await prisma.song.findMany({
        where: {},
      });
      res.status(200).json({
        ok: true,
        message: "Private and public songs",
        results: element,
      });
    } else {
      const element = await prisma.song.findMany({
        where: {
          public: true,
        },
      });
      res.status(200).json({
        ok: true,
        message: "Only public songs (private songs require login)",
        results: element,
      });
    }
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: error,
    });
  }
};

export const getSongID = async (req: Request, res: Response) => {
  try {
    const urlID = req.params.id;

    const element = await prisma.song.findUnique({
      where: {
        id: Number(urlID),
      },
    });
    if (element) {
      res.status(200).json({
        ok: true,
        results: element,
      });
    }
    res.status(404).json({
      ok: false,
      message: "Song not found",
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: error,
    });
  }
};
