import { getUserById } from "../services/userService";
import { Response, NextFunction } from "express";
import { customRequest } from "../types/customDefinition";

// User arayüzü tanımlanıyor
interface User {
  id: number;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
  created_at: Date;
  last_updated: Date;
}

const requireUser = async (
  req: customRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user: User | undefined = req.user;

    if (!user) {
      return res
        .status(403)
        .json({ message: "Auth token user not found", error: true });
    }
    const data = await getUserById(user.id);
    req.user = data?.toJSON();

    return next();
  } catch (err) {
    let message = "Internal Server Error";
    if (err instanceof Error) {
      message = err.message;
    } else if (err) {
      message = String(err);
    }
    return res.status(400).json({ message, error: true });
  }
};
export default requireUser;
