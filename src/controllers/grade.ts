import { Request, Response, NextFunction } from "express";

import ServiceGrade from "../services/grade";
import ServiceStudent from "../services/student";
import ServiceClass from "../services/class";

import helperFormatName from "../helpers/format-name";

export default {
  findLatestGrade,
  classIdFindAll,
  gradeTypeExists,
  createOne,
  updateOne,
};

async function findLatestGrade(
  _req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id: teacherId } = res.locals.user;

    const latestGrade = await ServiceGrade.findLatestGrade(teacherId);

    res.json({
      error: false,
      data: latestGrade.createdAt,
      message: res.locals.getLang("LATEST_GRADE_FOUND"),
    });
  } catch (error) {
    next(error);
  }
}

async function classIdFindAll(req: Request, res: Response, next: NextFunction) {
  try {
    const { id: teacherId } = res.locals.user;

    const { classId } = req.params;

    const grades = await ServiceGrade.classIdFindAll(
      Number(classId),
      teacherId
    );

    if (!grades.length || grades.length === 0) {
      throw new Error(res.locals.getLang("CLASS_ID_GRADES_NOT_FOUND"));
    }

    res.json({
      error: false,
      data: grades,
      message: res.locals.getLang("CLASS_ID_GRADES_FOUND"),
    });
  } catch (error) {
    next(error);
  }
}

async function gradeTypeExists(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id: teacherId } = res.locals.user;

    const { gradeType } = req.body;
    const { classId } = req.params;

    const classExists = await ServiceClass.idWithExists(
      Number(classId),
      teacherId
    );
    if (!classExists) {
      throw new Error(res.locals.getLang("CLASS_NOT_FOUND"));
    }

    const newGradeType = helperFormatName(gradeType);

    const grades = await ServiceGrade.gradeTypeExists(
      Number(classId),
      teacherId,
      newGradeType
    );

    if (grades) {
      throw new Error(res.locals.getLang("THERE_IS_NOTE_FOR_THIS_CLASS"));
    }

    res.json({
      error: false,
      data: grades,
      message: res.locals.getLang("GRADE_TYPE_NOT_FOUND"),
    });
  } catch (error) {
    next(error);
  }
}

async function createOne(req: Request, res: Response, next: NextFunction) {
  try {
    const { id: teacherId } = res.locals.user;
    const { classId, studentId } = req.params;
    const { gradeType, gradeValue } = req.body;

    const newGradeType = helperFormatName(gradeType);
    const classIdNumber = Number(classId);
    const studentIdNumber = Number(studentId);

    const classExists = await ServiceClass.idWithExists(
      classIdNumber,
      teacherId
    );

    if (!classExists) {
      throw new Error(res.locals.getLang("CLASS_NOT_FOUND"));
    }

    const student = await ServiceStudent.studentIdExists(
      studentIdNumber,
      classIdNumber,
      teacherId
    );
    if (!student) {
      throw new Error(res.locals.getLang("STUDENT_NOT_FOUND_IN_THE_CLASS"));
    }

    const gradeExists = await ServiceGrade.gradeTypeExists(
      classIdNumber,
      teacherId,
      newGradeType
    );
    if (gradeExists) {
      throw new Error(res.locals.getLang("GRADE_TYPE_EXISTS"));
    }

    const newGrade = await ServiceGrade.createOne({
      teacherId,
      studentId: studentIdNumber,
      classId: classIdNumber,
      gradeType: newGradeType,
      gradeValue,
    });

    res.json({
      error: false,
      data: newGrade,
      message: res.locals.getLang("GRADE_CREATED"),
    });
  } catch (error) {
    next(error);
  }
}

async function updateOne(req: Request, res: Response, next: NextFunction) {
  try {
    const { id: teacherId } = res.locals.user;
    const { classId, studentId, id } = req.params;
    const { gradeType, gradeValue } = req.body;

    const newGradeType = helperFormatName(gradeType);

    const student = await ServiceStudent.studentIdExists(
      Number(studentId),
      Number(classId),
      teacherId
    );
    if (!student) {
      throw new Error(res.locals.getLang("STUDENT_NOT_FOUND_IN_THE_CLASS"));
    }

    const gradeExists = await ServiceGrade.idExists(Number(id), teacherId);
    if (!gradeExists) {
      throw new Error(res.locals.getLang("GRADE_NOT_FOUND"));
    }

    const updatedGrade = await ServiceGrade.updateOne(Number(id), {
      teacherId,
      studentId: Number(studentId),
      classId: Number(classId),
      gradeType: newGradeType,
      gradeValue,
    });

    res.json({
      error: false,
      data: updatedGrade,
      message: res.locals.getLang("GRADE_UPDATED"),
    });
  } catch (error) {
    next(error);
  }
}
