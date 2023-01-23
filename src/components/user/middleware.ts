import { verify } from "jsonwebtoken";
import type { NextFunction, Request, Response } from "express";

require("dotenv").config;

export function validateAuthorization(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;

  if (!authorization) return res.status(401).json({ message: "Unauthorized" });
  if (!authorization.startsWith("Bearer "))
    return res.status(401).json({ message: "Token format wrong" });

  const token = authorization.replace("Bearer ", "");

  verify(token, process.env.SECRET_KEY ?? "", (err, decoded) => {
    if (err) return res.status(401).json({ message: "Invalid token" });

    req.user = decoded;
    next();
  });
}

export function validateToken(req: Request, res: Response) {
  const { authorization } = req.headers;

  if (!authorization) return false;
  if (!authorization.startsWith("Bearer ")) return false;

  const token = authorization.replace("Bearer ", "");

  return verify(token, process.env.SECRET_KEY ?? "", (err, decoded) => {
    console.log("proceso");
    if (err) return false;

    // req.user = decoded;
    return true;
  });
}
