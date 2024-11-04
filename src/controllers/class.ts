import { NextFunction, Response } from "express";
import { customRequest } from "../types/customDefinition";
import { createClass } from "../services/classService";

export const createClassController = async (
  req: customRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { class_name } = req.body;
    const { id: teacher_id } = req.user; // Öğretmen kimliğini req.user'dan alıyoruz

    const newClass = await createClass({
      class_name,
      teacher_id,
    });

    return res.status(201).json({
      data: newClass,
      error: false,
    });
  } catch (err) {
    next(err);
  }
};
