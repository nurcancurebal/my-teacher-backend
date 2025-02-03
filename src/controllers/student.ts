import { Request, Response, NextFunction } from "express";

import ServiceStudent from "../services/student";

export default { getCount, getAll };

async function getCount(_req: Request, res: Response, next: NextFunction) {
  try {
    const currentUser = res.locals.user;

    const { id: teacher_id } = currentUser;

    const count = await ServiceStudent.getCount(teacher_id);

    res.json({
      error: false,
      data: count,
      message: res.locals.getLang("STUDENT_COUNT_FOUND"),
    });
  } catch (error) {
    next(error);
  }
}

async function getAll(_req: Request, res: Response, next: NextFunction) {
  try {
    const currentUser = res.locals.user;

    const { id: teacher_id } = currentUser;

    const students = await ServiceStudent.getAll(teacher_id);

    res.json({
      error: false,
      data: students,
      message: res.locals.getLang("STUDENT_COUNT_FOUND"),
    });
  } catch (error) {
    next(error);
  }
}
