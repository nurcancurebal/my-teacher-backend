import { Request, Response, NextFunction } from "express";

import ServiceClass from "../services/class";

export default {
  findAll,
  getCount,
  createOne,
  updateOne,
  deleteOne,
};

async function findAll(_req: Request, res: Response, next: NextFunction) {
  try {
    const currentUser = res.locals.user;

    const { id: teacher_id } = currentUser;

    const classes = await ServiceClass.findAllWithTeacherId(teacher_id);

    res.json({
      error: false,
      data: classes,
      message: res.locals.getLang("CLASSES_FOUND"),
    });
  } catch (error) {
    next(error);
  }
}

async function getCount(_req: Request, res: Response, next: NextFunction) {
  try {
    const currentUser = res.locals.user;

    const { id: teacher_id } = currentUser;

    const count = await ServiceClass.getCount(teacher_id);

    res.json({
      error: false,
      data: count,
      message: res.locals.getLang("CLASS_COUNT_FOUND"),
    });
  } catch (error) {
    next(error);
  }
}

async function createOne(req: Request, res: Response, next: NextFunction) {
  try {
    const currentUser = res.locals.user;

    const { id: teacher_id } = currentUser;
    const { explanation, className } = req.body;

    const newClassName = className.trim().toUpperCase();

    const classExist = await ServiceClass.exists(newClassName);

    if (classExist) {
      throw new Error(res.locals.getLang("CLASS_ALREADY_EXIST"));
    }

    const newClass = await ServiceClass.create({
      class_name: newClassName,
      teacher_id,
      explanation,
    });

    res.json({
      data: newClass,
      error: false,
      message: res.locals.getLang("CLASS_CREATED"),
    });
  } catch (error) {
    next(error);
  }
}

async function updateOne(req: Request, res: Response, next: NextFunction) {
  try {
    const currentUser = res.locals.user;

    const { id } = req.params;
    const { className, explanation } = req.body;

    const newData = {
      class_name: className.trim().toUpperCase(),
      explanation,
    };

    const numberToId = parseInt(id);

    if (isNaN(numberToId)) {
      throw new Error(res.locals.getLang("INVALID_CLASS_ID"));
    }

    const teacherIsClasss = await ServiceClass.teacherIsClass(
      currentUser.id,
      numberToId
    );

    if (!teacherIsClasss) {
      throw new Error(res.locals.getLang("TEACHER_DOES_NOT_HAVE_CLASS"));
    }

    if (newData.class_name) {
      const classExist = await ServiceClass.exists(newData.class_name);

      if (classExist) {
        throw new Error(res.locals.getLang("CLASS_ALREADY_EXIST"));
      }
    }

    const updated = await ServiceClass.updateOne(numberToId, newData);

    res.json({
      data: updated,
      error: false,
      message: res.locals.getLang("CLASS_UPDATED"),
    });
  } catch (error) {
    next(error);
  }
}

async function deleteOne(req: Request, res: Response, next: NextFunction) {
  try {
    const currentUser = res.locals.user;

    const { id } = req.params;

    const numberToId = parseInt(id);

    if (isNaN(numberToId)) {
      throw new Error(res.locals.getLang("INVALID_CLASS_ID"));
    }

    const teacherIsClass = await ServiceClass.teacherIsClass(
      currentUser.id,
      numberToId
    );

    if (!teacherIsClass) {
      throw new Error(res.locals.getLang("TEACHER_DOES_NOT_HAVE_CLASS"));
    }

    const deleted = await ServiceClass.deleteOne(numberToId);

    res.json({
      data: deleted,
      error: false,
      message: res.locals.getLang("CLASS_SUCCESS_DELETED"),
    });
  } catch (error) {
    next(error);
  }
}
