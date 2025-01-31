import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config";

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.cookies["token"];

  if (!token) {
    res.status(401).json({ error: "Unauthorized." });
    return;
  }

  try {
    const jwtData = jwt.verify(token as string, JWT_SECRET) as { id: string };
    req.userId = jwtData.id;
    next();
  } catch (e) {
    res.status(401).json({ error: "Invalid token." });
  }
}
