import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../../../env";

interface JwtPayload {
  id: string;
}

export async function verifyJWT(request: Request, response: Response, next: NextFunction) {
  const token = request.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return response.status(403).json({ message: "Token não informado" });
  }

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as JwtPayload;
    request.userId = decoded.id;

    next();
  } catch (err) {
    return response.status(403).json({ message: "Token inválido!" });
  }
}
