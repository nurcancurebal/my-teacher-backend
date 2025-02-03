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
}
