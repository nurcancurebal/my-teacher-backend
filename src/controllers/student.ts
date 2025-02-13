import { Request, Response, NextFunction } from "express";

import ServiceStudent from "../services/student";
import ServiceClass from "../services/class";

import helperFormatName from "../helpers/format-name";

export default {
  getCount,
  getAll,
  filter,
  genderCount,
  getAllByClassId,
  countByClassId,
  createOne,
  updateOne,
  deleteOne,
};

async function getCount(_req: Request, res: Response, next: NextFunction) {
  try {
    const { id: teacherId } = res.locals.user;

    const count = await ServiceStudent.getCount(teacherId);

    res.json({
      error: false,
      data: count,
      message: res.locals.getLang("STUDENT_COUNT_FOUND"),
    });
  } catch (error) {
    next(error);
  }
}

async function filter(req: Request, res: Response, next: NextFunction) {
  try {
    const { id: teacherId } = res.locals.user;

    const query = req.query;

    const students = await ServiceStudent.filter(
      teacherId,
      query as { [key: string]: string }
    );

    res.json({
      error: false,
      data: students,
      message: res.locals.getLang("STUDENTS_FOUND"),
    });
  } catch (error) {
    next(error);
  }
}

async function getAll(_req: Request, res: Response, next: NextFunction) {
  try {
    const { id: teacherId } = res.locals.user;

    const students = await ServiceStudent.getAll(teacherId);

    res.json({
      error: false,
      data: students,
      message: res.locals.getLang("STUDENTS_FOUND"),
    });
  } catch (error) {
    next(error);
  }
}

async function genderCount(_req: Request, res: Response, next: NextFunction) {
  try {
    const { id: teacherId } = res.locals.user;

    const count = await ServiceStudent.getGenderCount(teacherId);

    res.json({
      error: false,
      data: count,
      message: res.locals.getLang("STUDENT_GENDER_COUNT_FOUND"),
    });
  } catch (error) {
    next(error);
  }
}

async function getAllByClassId(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id: teacherId } = res.locals.user;

    const { classId } = req.params;

    const result = await ServiceClass.idWithExists(Number(classId), teacherId);
    if (!result) {
      throw new Error(res.locals.getLang("CLASS_NOT_FOUND"));
    }

    const students = await ServiceStudent.getStudentByClassId(
      teacherId,
      Number(classId)
    );

    res.json({
      error: false,
      data: students,
      message: res.locals.getLang("CLASS_ID_STUDENTS_FOUND"),
    });
  } catch (error) {
    next(error);
  }
}

async function countByClassId(req: Request, res: Response, next: NextFunction) {
  try {
    const { id: teacherId } = res.locals.user;

    const { classId } = req.params;

    const studentCount = await ServiceStudent.byClassCount(
      teacherId,
      Number(classId)
    );

    res.json({
      error: false,
      data: studentCount,
      message: res.locals.getLang("NUMBER_OF_STUDENTS_BY_CLASS_FOUND"),
    });
  } catch (error) {
    next(error);
  }
}

async function createOne(req: Request, res: Response, next: NextFunction) {
  try {
    const { id: teacherId } = res.locals.user;

    const { firstname, lastname, birthday, number, idNumber, gender } =
      req.body;

    const { classId } = req.params;

    const newFirstname = helperFormatName(firstname);
    const newLastname = helperFormatName(lastname);

    const numberExists = await ServiceStudent.numberWithExists(
      teacherId,
      number
    );
    if (numberExists) {
      throw new Error(res.locals.getLang("NUMBER_EXISTS"));
    }

    const idNumberExists = await ServiceStudent.idNumberWithExists(
      teacherId,
      idNumber
    );
    if (idNumberExists) {
      throw new Error(res.locals.getLang("ID_NUMBER_ALREADY_EXISTS"));
    }

    const classIdExists = await ServiceClass.idWithExists(
      Number(classId),
      teacherId
    );

    if (!classIdExists) {
      throw new Error(res.locals.getLang("CLASS_NOT_FOUND"));
    }

    const student = await ServiceStudent.createOne({
      teacherId,
      classId: Number(classId),
      idNumber,
      firstname: newFirstname,
      lastname: newLastname,
      number,
      gender,
      birthday,
    });

    res.json({
      error: false,
      data: student,
      message: res.locals.getLang("STUDENT_CREATED"),
    });
  } catch (error) {
    next(error);
  }
}

async function updateOne(req: Request, res: Response, next: NextFunction) {
  try {
    const { id: teacherId } = res.locals.user;

    const { firstname, lastname, birthday, number, idNumber, classId, gender } =
      req.body;

    const { id } = req.params;

    const newFirstname = helperFormatName(firstname);
    const newLastname = helperFormatName(lastname);

    const getOneById = await ServiceStudent.getOneById(Number(id), teacherId);
    if (!getOneById) {
      throw new Error(res.locals.getLang("STUDENT_NOT_FOUND"));
    }

    if (getOneById.number !== number) {
      const numberExists = await ServiceStudent.numberWithExists(
        teacherId,
        number
      );
      if (numberExists) {
        throw new Error(res.locals.getLang("NUMBER_ALREADY_EXISTS"));
      }
    }

    if (getOneById.idNumber !== idNumber) {
      const idNumberExists = await ServiceStudent.idNumberWithExists(
        teacherId,
        idNumber
      );
      if (idNumberExists) {
        throw new Error(res.locals.getLang("ID_NUMBER_ALREADY_EXISTS"));
      }
    }

    const newBirthday = new Date(birthday);
    if (isNaN(newBirthday.getTime())) {
      throw new Error(res.locals.getLang("INVALID_DATE"));
    }

    const classIdExists = await ServiceClass.idWithExists(
      Number(classId),
      teacherId
    );

    if (!classIdExists) {
      throw new Error(res.locals.getLang("CLASS_NOT_FOUND"));
    }

    const student = await ServiceStudent.updateOne({
      id: Number(id),
      teacherId,
      idNumber,
      firstname: newFirstname,
      lastname: newLastname,
      number,
      birthday: newBirthday,
      classId: Number(classId),
      gender,
    });

    res.json({
      error: false,
      data: student,
      message: res.locals.getLang("STUDENT_UPDATED"),
    });
  } catch (error) {
    next(error);
  }
}

async function deleteOne(req: Request, res: Response, next: NextFunction) {
  try {
    const { id: teacherId } = res.locals.user;

    const { id } = req.params;

    const idExists = await ServiceStudent.idWithExists(Number(id), teacherId);
    if (!idExists) {
      throw new Error(res.locals.getLang("STUDENT_NOT_FOUND"));
    }

    await ServiceStudent.deleteStudent(Number(id), teacherId);

    res.json({
      error: false,
      data: null,
      message: res.locals.getLang("STUDENT_DELETED"),
    });
  } catch (error) {
    next(error);
  }
}
