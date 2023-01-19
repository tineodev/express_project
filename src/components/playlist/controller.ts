import type { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getPlaylist = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const element = prisma.playlist.findMany();
    res.status(200).json(element);
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: error,
    });
  }
};
