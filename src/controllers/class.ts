import { NextFunction, Response } from "express";
import { customRequest } from "../types/customDefinition";
import { createClass, classExists } from "../services/classService";
import { ApiError } from "../util/ApiError";

export const createClassController = async (
  req: customRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id: teacher_id } = req.user; // Öğretmen kimliğini req.user'dan alıyoruz
    const { class_name } = req.body;

    // Sınıf adının benzersiz olup olmadığını kontrol et
    const classExist = await classExists({
      class_name,
    });
    if (classExist) {
      throw new ApiError(400, "Class name is alredy used");
    }

    // Yeni sınıf oluştur
    const newClass = await createClass({ class_name, teacher_id });

    return res.status(201).json({
      data: newClass,
      error: false,
    });
  } catch (err) {
    next(err);
  }
};
