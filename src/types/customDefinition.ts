import { NextFunction, Request, Response } from "express";

export interface customRequest extends Request {
  user: {
    id: number;
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    password: string;
    created_at: Date;
    last_updated: Date;
  };
}

export interface customError extends Error {
  statusCode: number;
}

export type ControllerFunction = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;
