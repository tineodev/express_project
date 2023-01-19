import type { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

module.exports.accessUser = false;

export const login = async (req: Request, res: Response): Promise<void> => {

  const data = req.body;

  try {
    const user = await prisma.user.findFirst({
      where: {
        email: data.email
      }
    });

    res.status(200);

    if (user !== null){
      //res.json({res: "existe"})
      
      let isMatch = await bcrypt.compare(data.password, user.password)

      if(isMatch){
        module.exports.accessUser = true;
        res.json({message: "Ha iniciado sesión correctamente"})
      }else{
        res.json({message: "Contraseña incorrecta, inténtelo nuevamente"})        
      }
      
    }else{
      res.json({message: "El usuario NO EXISTE"})
    }
    
  } catch (error) {
    res.status(500).json({ ok: false, message: error });
  }
};

export const store = async (req: Request, res: Response): Promise<void> => {
     
  try {
    const data = req.body;
    // cantidad de saltos
    data.password = await bcrypt.hash(data.password,8)

    await prisma.user.create({ data });

    res.status(201).json({ ok: true, message: "Usuario creado correctamente" });
  } catch (error) {
    res.status(500).json({ ok: false, message: error });
  }

};