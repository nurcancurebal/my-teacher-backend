import ModelGrade, { IGradeCreationAttributes } from "../models/grade";

export default class ClassService extends ModelGrade {
  static async findLatestGrade(
    teacher_id: number
  ): Promise<IGradeCreationAttributes> {
    const result = await this.findOne({
      order: [["created_at", "DESC"]],
      where: {
        teacher_id,
      },
    });

    return result;
  }

  static async classIdFindAll(
    class_id: number,
    teacher_id: number
  ): Promise<IGradeCreationAttributes[]> {
    const result = await this.findAll({
      where: {
        class_id,
        teacher_id,
      },
    });

    return result;
  }

  static async gradeTypeExists(
    class_id: number,
    teacher_id: number,
    grade_type: string
  ): Promise<boolean> {
    const result = await this.findOne({
      where: {
        class_id,
        teacher_id,
        grade_type,
      },
    });

    return !!result;
  }

  static async createOne(
    data: IGradeCreationAttributes
  ): Promise<IGradeCreationAttributes> {
    const result = await this.create(data);

    return result;
  }

  static async updateOne(
    id: number,
    data: IGradeCreationAttributes
  ): Promise<number> {
    const result = await this.update(data, {
      where: {
        id,
      },
    });

    return result[0];
  }

  static async idExists(id: number, teacher_id: number): Promise<boolean> {
    const result = await this.findOne({
      where: {
        id,
        teacher_id,
      },
    });

    return !!result;
  }
}
