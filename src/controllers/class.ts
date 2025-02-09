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
    const { id: teacherId } = res.locals.user;

    const classes = await ServiceClass.findAllWithTeacherId(teacherId);

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
    const { id: teacherId } = res.locals.user;

    const count = await ServiceClass.getCount(teacherId);

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
    const { id: teacherId } = res.locals.user;

    const { explanation, className } = req.body;

    const newClassName = className.trim().toUpperCase();

    const classNameExists = await ServiceClass.classNameWithExists(
      newClassName,
      teacherId
    );

    if (classNameExists) {
      throw new Error(res.locals.getLang("CLASS_NAME_ALREADY_EXISTS"));
    }

    const newClass = await ServiceClass.createOne({
      teacherId,
      className: newClassName,
      explanation,
    });

    res.json({
      error: false,
      data: newClass,
      message: res.locals.getLang("CLASS_CREATED"),
    });
  } catch (error) {
    next(error);
  }
}

async function updateOne(req: Request, res: Response, next: NextFunction) {
  try {
    const { id: teacherId } = res.locals.user;

    const { id } = req.params;
    const { className, explanation } = req.body;

    const verifyClassAssignment = await ServiceClass.verifyClassAssignment(
      teacherId,
      Number(id)
    );
    if (!verifyClassAssignment) {
      throw new Error(res.locals.getLang("TEACHER_DOES_NOT_HAVE_CLASS"));
    }

    const newClassName = className.trim().toUpperCase();

    if (verifyClassAssignment.className !== newClassName) {
      const classNameExists = await ServiceClass.classNameWithExists(
        newClassName,
        teacherId
      );
      if (classNameExists) {
        throw new Error(res.locals.getLang("CLASS_NAME_ALREADY_EXISTS"));
      }
    }

    const updated = await ServiceClass.updateOne(Number(id), {
      teacherId,
      className: newClassName,
      explanation,
    });

    res.json({
      error: false,
      data: updated,
      message: res.locals.getLang("CLASS_UPDATED"),
    });
  } catch (error) {
    next(error);
  }
}

async function deleteOne(req: Request, res: Response, next: NextFunction) {
  try {
    const { id: teacherId } = res.locals.user;

    const { id } = req.params;

    const verifyClassAssignment = await ServiceClass.verifyClassAssignment(
      teacherId,
      Number(id)
    );

    if (!verifyClassAssignment) {
      throw new Error(res.locals.getLang("TEACHER_DOES_NOT_HAVE_CLASS"));
    }

    const deleted = await ServiceClass.deleteOne(Number(id));

    res.json({
      error: false,
      data: deleted,
      message: res.locals.getLang("CLASS_SUCCESS_DELETED"),
    });
  } catch (error) {
    next(error);
  }
}
