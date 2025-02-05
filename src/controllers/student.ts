import { Request, Response, NextFunction } from "express";

import ServiceStudent from "../services/student";
import ServiceClass from "../services/class";

import helperFormatName from "../helpers/format-name";

export default {
  getCount,
  getAll,
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

    const {
      studentName,
      studentLastname,
      birthdate,
      studentNumber,
      idNumber,
      gender,
    } = req.body;

    const { classId } = req.params;

    const newStudentName = helperFormatName(studentName);
    const newStudentLastname = helperFormatName(studentLastname);

    const studentNumberExists = await ServiceStudent.studentNumberWithExists(
      teacherId,
      studentNumber
    );
    if (studentNumberExists) {
      throw new Error(res.locals.getLang("STUDENT_STUDENT_NUMBER_EXISTS"));
    }

    const newIdNumber = BigInt(idNumber);

    const idNumberExists = await ServiceStudent.idNumberWithExists(
      teacherId,
      newIdNumber
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
      teacher_id: teacherId,
      class_id: Number(classId),
      id_number: newIdNumber,
      student_name: newStudentName,
      student_lastname: newStudentLastname,
      student_number: studentNumber,
      gender,
      birthdate,
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

    const {
      studentName,
      studentLastname,
      birthdate,
      studentNumber,
      idNumber,
      classId,
      gender,
    } = req.body;

    const { id } = req.params;

    const newStudentName = helperFormatName(studentName);
    const newStudentLastname = helperFormatName(studentLastname);

    const getOneById = await ServiceStudent.getOneById(Number(id), teacherId);
    if (!getOneById) {
      throw new Error(res.locals.getLang("STUDENT_NOT_FOUND"));
    }

    if (getOneById.student_number !== studentNumber) {
      const studentNumberExists = await ServiceStudent.studentNumberWithExists(
        teacherId,
        studentNumber
      );
      if (studentNumberExists) {
        throw new Error(res.locals.getLang("STUDENT_NUMBER_ALREADY_EXISTS"));
      }
    }

    if (BigInt(getOneById.id_number) !== BigInt(idNumber)) {
      const newIdNumber = BigInt(idNumber);

      const idNumberExists = await ServiceStudent.idNumberWithExists(
        teacherId,
        newIdNumber
      );
      if (idNumberExists) {
        throw new Error(res.locals.getLang("ID_NUMBER_ALREADY_EXISTS"));
      }
    }

    const newBirthdate = new Date(birthdate);
    if (isNaN(newBirthdate.getTime())) {
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
      teacher_id: teacherId,
      id_number: BigInt(idNumber),
      student_name: newStudentName,
      student_lastname: newStudentLastname,
      student_number: studentNumber,
      birthdate: newBirthdate,
      class_id: Number(classId),
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
