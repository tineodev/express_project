import type { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const listSong = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = req.body;

    const element = await prisma.user.create({ data });

    res.status(201).json({
      ok: true,
      message: "Usuario creado correctamente",
      element: element,
    });
  } catch (error) {
    res.status(500).json({ ok: false, message: error });
  }
};
