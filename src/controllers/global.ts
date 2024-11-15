import { customRequest } from "../types/customDefinition";
import { Request, Response, NextFunction } from "express";
import { dbSync } from "../db/connection";

export const getServerStatus = (
  req: customRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    res.status(200).json({ message: "server is up..", user: req.user });
  } catch (err) {
    next(err);
  }
};

export const syncDatabase = async (_req: Request, res: Response) => {
  try {
    const sync = await dbSync(); // dbSync() veritabanına bağlantı kurar ve veritabanı senkronizasyonunu gerçekleştirir.
    res.status(200).json({ ...sync, error: false });
  } catch (err) {
    console.log("ERR", err);
    let message = "Internal Server Error";
    if (err instanceof Error) {
      message = err.message;
    } else if (err) {
      message = String(err);
    }
    return res.status(400).json({ message, error: true });
  }
};
