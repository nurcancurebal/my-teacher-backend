import ModelStudent, { IStudentCreationAttributes } from "../models/student";
import { Op } from "sequelize";

export default class studentService extends ModelStudent {
  static async getCount(teacherId: number): Promise<number> {
    const result = await this.count({
      where: {
        teacherId,
      },
    });

    return result;
  }

  static async filter(
    teacherId: number,
    query: { [key: string]: string }
  ): Promise<IStudentCreationAttributes[]> {
    const whereClause: {
      teacherId: number;
      [Op.or]?: object[];
      [Op.and]?: object[];
    } = {
      teacherId,
    };

    const andConditions: object[] = [];

    if (query.firstname) {
      andConditions.push({
        studentName: { [Op.iLike]: `%${query.firstname}%` },
      });
    }

    if (query.lastname) {
      andConditions.push({
        studentLastname: { [Op.iLike]: `%${query.lastname}%` },
      });
    }

    if (query.studentNumber) {
      andConditions.push({ studentNumber: query.studentNumber });
    }

    if (query.gender) {
      andConditions.push({ gender: query.gender });
    }

    if (query.classId) {
      andConditions.push({ classId: query.classId });
    }

    if (andConditions.length > 0) {
      whereClause[Op.and] = andConditions;
    }

    const result = await this.findAll({
      where: whereClause,
    });

    return result;
  }

  static async getAll(
    teacherId: number
  ): Promise<IStudentCreationAttributes[]> {
    const result = await this.findAll({
      where: {
        teacherId,
      },
    });

    return result;
  }

  static async getOneById(
    id: number,
    teacherId: number
  ): Promise<IStudentCreationAttributes> {
    const result = await this.findOne({
      where: {
        id,
        teacherId,
      },
    });

    return result;
  }

  static async getGenderCount(teacherId: number): Promise<{
    maleCount: number;
    femaleCount: number;
  }> {
    const maleCount = await this.count({
      where: { teacherId, gender: "Male" },
    });
    const femaleCount = await this.count({
      where: { teacherId, gender: "Female" },
    });

    return { maleCount, femaleCount };
  }

  static async getStudentByClassId(
    teacherId: number,
    classId: number
  ): Promise<IStudentCreationAttributes[]> {
    const result = await this.findAll({
      where: {
        teacherId,
        classId,
      },
    });

    return result;
  }

  static async byClassCount(
    teacherId: number,
    classId: number
  ): Promise<number> {
    const result = await this.count({
      where: {
        teacherId,
        classId,
      },
    });

    return result;
  }

  static async studentNumberWithExists(
    teacherId: number,
    studentNumber: number
  ): Promise<boolean> {
    const result = await this.findOne({
      where: {
        teacherId,
        studentNumber,
      },
    });

    return !!result;
  }

  static async idNumberWithExists(
    teacherId: number,
    idNumber: string
  ): Promise<boolean> {
    const result = await this.findOne({
      where: {
        teacherId,
        idNumber,
      },
    });

    return !!result;
  }

  static async createOne(
    data: IStudentCreationAttributes
  ): Promise<IStudentCreationAttributes> {
    const result = await this.create(data);

    return result;
  }

  static async idWithExists(id: number, teacherId: number): Promise<boolean> {
    const result = await this.findOne({
      where: {
        id,
        teacherId,
      },
    });

    return !!result;
  }

  static async updateOne(data: IStudentCreationAttributes): Promise<number> {
    const { id, teacherId, ...updateData } = data;

    const result = await this.update(updateData, {
      where: { id, teacherId },
    });

    return result[0];
  }

  static async deleteStudent(id: number, teacherId: number): Promise<boolean> {
    const result = await this.destroy({
      where: {
        id,
        teacherId,
      },
    });

    return !!result;
  }

  static async studentIdExists(
    id: number,
    classId: number,
    teacherId: number
  ): Promise<boolean> {
    const result = await this.findOne({
      where: { id, classId, teacherId },
    });

    return !!result;
  }
}
