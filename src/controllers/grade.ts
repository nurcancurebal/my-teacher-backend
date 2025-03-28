import { Request, Response, NextFunction } from "express";

import ServiceGrade from "../services/grade";
import ServiceStudent from "../services/student";
import ServiceClass from "../services/class";

import helperFormatName from "../helpers/format-name";

export default {
  uniqueGradeType,
  findLatestGrade,
  classIdFindAll,
  gradeTypeExists,
  createOne,
  updateOne,
  deleteAllGradeType,
  allGradeType,
  classIdGrade,
  deleteOne,
  studentIdFindAll,
  uniqueGradeTypeClass,
};

async function allGradeType(req: Request, res: Response, next: NextFunction) {
  try {
    const { id: teacherId } = res.locals.user;
    const { gradeType } = req.body;
    const newGradeType = helperFormatName(gradeType);

    const grades = await ServiceGrade.getGradeType(teacherId, newGradeType);

    res.json({
      error: false,
      data: grades,
      message: res.locals.getLang("GRADES_FOUND"),
    });
  } catch (error) {
    next(error);
  }
}

async function uniqueGradeType(
  _req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id: teacherId } = res.locals.user;

    const grades = await ServiceGrade.getAll(teacherId);

    const uniqueGrades = grades.reduce(
      (
        acc: {
          [key: string]: {
            gradeType: string;
            createAt: Date;
            lastUpdated: Date;
          };
        },
        grade
      ) => {
        const { gradeType, createdAt, lastUpdated } = grade;
        if (!acc[gradeType]) {
          acc[gradeType] = {
            gradeType,
            createAt: createdAt,
            lastUpdated: lastUpdated,
          };
        } else {
          acc[gradeType].lastUpdated = lastUpdated;
        }
        return acc;
      },
      {}
    );

    const result = Object.values(uniqueGrades);

    res.json({
      error: false,
      data: result,
      message: res.locals.getLang("GRADES_FOUND"),
    });
  } catch (error) {
    next(error);
  }
}

async function uniqueGradeTypeClass(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id: teacherId } = res.locals.user;
    const { classId } = req.params;

    const grades = await ServiceGrade.classIdFindAll(
      Number(classId),
      teacherId
    );

    const uniqueGrades = grades.reduce(
      (
        acc: {
          [key: string]: {
            gradeType: string;
            createAt: Date;
            lastUpdated: Date;
          };
        },
        grade
      ) => {
        const { gradeType, createdAt, lastUpdated } = grade;
        if (!acc[gradeType]) {
          acc[gradeType] = {
            gradeType,
            createAt: createdAt,
            lastUpdated: lastUpdated,
          };
        } else {
          acc[gradeType].lastUpdated = lastUpdated;
        }
        return acc;
      },
      {}
    );

    const result = Object.values(uniqueGrades);

    res.json({
      error: false,
      data: result,
      message: res.locals.getLang("GRADES_FOUND"),
    });
  } catch (error) {
    next(error);
  }
}

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

async function studentIdFindAll(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id: teacherId } = res.locals.user;

    const { studentId } = req.params;

    const grades = await ServiceGrade.studentIdFindAll(
      Number(studentId),
      teacherId
    );

    if (!grades.length || grades.length === 0) {
      throw new Error(res.locals.getLang("STUDENT_ID_GRADES_NOT_FOUND"));
    }

    res.json({
      error: false,
      data: grades,
      message: res.locals.getLang("STUDENT_ID_GRADES_FOUND"),
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

async function classIdGrade(req: Request, res: Response, next: NextFunction) {
  try {
    const { id: teacherId } = res.locals.user;

    const { classId } = req.params;
    const { gradeType } = req.body;

    const newGradeType = helperFormatName(gradeType);

    const grades = await ServiceGrade.classIdGrade(
      Number(classId),
      teacherId,
      newGradeType
    );

    if (!grades.length || grades.length === 0) {
      throw new Error(res.locals.getLang("GRADE_TYPE_NOT_FOUND"));
    }

    res.json({
      error: false,
      data: grades,
      message: res.locals.getLang("GRADE_TYPE_FOUND"),
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

async function deleteAllGradeType(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id: teacherId } = res.locals.user;
    const { gradeType } = req.params;

    const newGradeType = helperFormatName(gradeType);

    await ServiceGrade.deleteGradeType(Number(teacherId), newGradeType);

    res.json({
      error: false,
      data: null,
      message: res.locals.getLang("GRADE_DELETED"),
    });
  } catch (error) {
    next(error);
  }
}

async function deleteOne(req: Request, res: Response, next: NextFunction) {
  try {
    const { id: teacherId } = res.locals.user;
    const { id } = req.params;

    const gradeExists = await ServiceGrade.idExists(Number(id), teacherId);
    if (!gradeExists) {
      throw new Error(res.locals.getLang("GRADE_NOT_FOUND"));
    }

    await ServiceGrade.deleteOne(Number(id), teacherId);

    res.json({
      error: false,
      data: null,
      message: res.locals.getLang("GRADE_DELETED"),
    });
  } catch (error) {
    next(error);
  }
}
