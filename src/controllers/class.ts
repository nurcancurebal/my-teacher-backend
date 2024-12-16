import { NextFunction, Response } from "express";
import { customRequest } from "../types/customDefinition";
import {
  getClasses,
  getClassCount,
  classExists,
  createClass,
  teacherIsClass,
  updateClass,
} from "../services/classService";
import { ApiError } from "../util/ApiError";

export const getClassController = async (
  req: customRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id: teacher_id } = req.user;

    const classes = await getClasses(teacher_id);

    return res.status(200).json({
      data: classes,
      error: false,
    });
  } catch (err) {
    next(err);
  }
};

export const getClassCountController = async (
  req: customRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id: teacher_id } = req.user;

    const count = await getClassCount(teacher_id);

    return res.status(200).json({
      data: count,
      error: false,
    });
  } catch (error) {
    next(error);
  }
};

export const createClassController = async (
  req: customRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id: teacher_id } = req.user;
    let { class_name } = req.body;
    const { explanation } = req.body;

    class_name = class_name.trim().toUpperCase();

    // Sınıf adının benzersiz olup olmadığını kontrol et
    const classExist = await classExists({
      class_name,
    });
    if (classExist) {
      throw new ApiError(400, "Class name is already used");
    }

    // Yeni sınıf oluştur
    const newClass = await createClass({ class_name, teacher_id, explanation });

    return res.status(201).json({
      data: newClass,
      error: false,
    });
  } catch (err) {
    next(err);
  }
};

export const updateClassController = async (
  req: customRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const teacher_id = req.user.id;
    let { class_name } = req.body;
    const { explanation } = req.body;

    if (class_name) {
      class_name = class_name.trim().toUpperCase();
    }

    const numberId = parseInt(id, 10);
    if (isNaN(numberId)) {
      throw new ApiError(400, "Invalid class id");
    }

    const teacherIsClasss = await teacherIsClass(teacher_id, numberId);

    if (!teacherIsClasss) {
      throw new ApiError(401, "The teacher does not have such a class");
    }

    if (class_name) {
      // Sınıf adının benzersiz olup olmadığını kontrol et
      const classExist = await classExists({
        class_name,
      });
      if (classExist) {
        throw new ApiError(400, "Class name is already used");
      }
    }

    const updated = await updateClass({
      id: numberId,
      class_name,
      explanation,
    });

    return res.status(200).json({
      data: updated,
      error: false,
    });
  } catch (error) {
    next(error);
  }
};
