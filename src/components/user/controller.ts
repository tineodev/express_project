import type { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const bcrypt = require("bcrypt");

import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const prisma = new PrismaClient();

module.exports.accessUser = false;

export const login = async (req: Request, res: Response): Promise<void> => {
  const data = req.body;

  try {
    const user = await prisma.user.findFirst({
      where: {
        email: data.email,
      },
    });

    res.status(200);

    if (user !== null) {
      let isMatch = await bcrypt.compare(data.password, user.password);

      if (isMatch) {
        module.exports.accessUser = true;

        const date = new Date().toISOString();
        const last_session = await prisma.user.update({
          where: { email: data.email, },
          data: { last_session: date, }
        });
  
        const token = jwt.sign({ user }, process.env.SECRET_KEY ?? "", {
          expiresIn: "12h",
        });
        res.status(201).json({
          user,
          token,
        });
      } else {
        res.json({ message: "Password incorrect" });
      }

    } else {
      res.json({ message: "This Email doesn't exist" });
    }
  } catch (error) {
    res.status(500).json({ ok: false, message: error });
  }
};

export const store = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = req.body;
    // cantidad de saltos
    data.password = await bcrypt.hash(data.password, 8);

    await prisma.user.create({ data });

    res.status(201).json({ ok: true, message: "Usuario creado correctamente" });
  } catch (error) {
    res.status(500).json({ ok: false, message: error });
  }
};
