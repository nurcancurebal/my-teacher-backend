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

  static async getOneById(
    id: number,
    teacher_id: number
  ): Promise<IStudentCreationAttributes> {
    const result = await this.findOne({
      where: {
        id,
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
      where: { teacher_id, gender: "Male" },
    });
    const femaleCount = await this.count({
      where: { teacher_id, gender: "Female" },
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

  static async studentNumberWithExists(
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

  static async idNumberWithExists(
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

  static async createOne(
    data: IStudentCreationAttributes
  ): Promise<IStudentCreationAttributes> {
    const result = await this.create(data);

    return result;
  }

  static async idWithExists(id: number, teacher_id: number): Promise<boolean> {
    const result = await this.findOne({
      where: {
        id,
        teacher_id,
      },
    });

    return !!result;
  }

  static async updateOne(data: IStudentCreationAttributes): Promise<number> {
    const { id, teacher_id, ...updateData } = data;

    const result = await this.update(updateData, {
      where: { id, teacher_id },
    });

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

  static async studentIdExists(
    id: number,
    class_id: number,
    teacher_id: number
  ): Promise<boolean> {
    const result = await this.findOne({
      where: { id, class_id, teacher_id },
    });

    return !!result;
  }
}
