import ModelStudent, { IStudentCreationAttributes } from "../models/student";

export default class studentService extends ModelStudent {
  static async getCount(teacher_id: number): Promise<number> {
    const result = await this.count({
      where: {
        teacher_id,
      },
    });

    return result;
  }

  static async getAll(
    teacher_id: number
  ): Promise<IStudentCreationAttributes[]> {
    const result = await this.findAll({
      where: {
        teacher_id,
      },
    });

    return result;
  }

  static async getGenderCount(teacher_id: number): Promise<{
    maleCount: number;
    femaleCount: number;
  }> {
    const maleCount = await this.count({
      where: { teacher_id, gender: "male" },
    });
    const femaleCount = await this.count({
      where: { teacher_id, gender: "female" },
    });

    return { maleCount, femaleCount };
  }

  static async getStudentByClassId(
    teacher_id: number,
    class_id: number
  ): Promise<IStudentCreationAttributes[]> {
    const result = await this.findAll({
      where: {
        teacher_id,
        class_id,
      },
    });

    return result;
  }

  static async byClassCount(
    teacher_id: number,
    class_id: number
  ): Promise<number> {
    const result = await this.count({
      where: {
        teacher_id,
        class_id,
      },
    });

    return result;
  }

  static async existsByStudentNumber(
    teacher_id: number,
    student_number: number
  ): Promise<boolean> {
    const result = await this.findOne({
      where: {
        teacher_id,
        student_number,
      },
    });

    return !!result;
  }

  static async existsByIdNumber(
    teacher_id: number,
    id_number: bigint
  ): Promise<boolean> {
    const result = await this.findOne({
      where: {
        teacher_id,
        id_number: BigInt(id_number),
      },
    });

    return !!result;
  }

  static async existsByClassId(
    teacher_id: number,
    class_id: number
  ): Promise<boolean> {
    const result = await this.findOne({
      where: {
        teacher_id,
        class_id,
      },
    });

    return !!result;
  }

  static async createOne({
    teacherId,
    classId,
    newIdNumber,
    newStudentName,
    newStudentLastname,
    studentNumber,
    gender,
    newBirthdate,
  }: {
    teacherId: number;
    classId: number;
    newIdNumber: bigint;
    newStudentName: string;
    newStudentLastname: string;
    studentNumber: number;
    gender: string;
    newBirthdate: Date;
  }): Promise<IStudentCreationAttributes> {
    const result = await this.create({
      teacher_id: teacherId,
      class_id: classId,
      id_number: newIdNumber,
      student_name: newStudentName,
      student_lastname: newStudentLastname,
      student_number: studentNumber,
      gender,
      birthdate: newBirthdate,
    });

    return result;
  }

  static async existsById(teacher_id: number, id: number): Promise<boolean> {
    const result = await this.findOne({
      where: {
        teacher_id,
        id,
      },
    });

    return !!result;
  }

  static async updateStudent({
    id,
    teacherId,
    idNumber,
    studentName,
    studentLastname,
    studentNumber,
    birthdate,
    classId,
    gender,
  }: {
    id: number;
    teacherId: number;
    idNumber: bigint;
    studentName: string;
    studentLastname: string;
    studentNumber: number;
    birthdate: Date;
    classId: number;
    gender: string;
  }): Promise<number> {
    const result = await this.update(
      {
        id_number: idNumber,
        student_name: studentName,
        student_lastname: studentLastname,
        student_number: studentNumber,
        birthdate,
        class_id: classId,
        gender,
      },
      {
        where: {
          id,
          teacher_id: teacherId,
        },
      }
    );

    return result[0];
  }

  static async deleteStudent(id: number, teacher_id: number): Promise<boolean> {
    const result = await this.destroy({
      where: {
        id,
        teacher_id,
      },
    });

    return !!result;
  }
}
