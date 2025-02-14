import ModelGrade, { IGradeCreationAttributes } from "../models/grade";

export default class ClassService extends ModelGrade {
  static async getAll(teacherId: number): Promise<IGradeCreationAttributes[]> {
    const result = await this.findAll({
      where: {
        teacherId,
      },
    });

    return result;
  }

  static async findLatestGrade(
    teacherId: number
  ): Promise<IGradeCreationAttributes> {
    const result = await this.findOne({
      order: [["createdAt", "DESC"]],
      where: {
        teacherId,
      },
    });

    return result;
  }

  static async classIdFindAll(
    classId: number,
    teacherId: number
  ): Promise<IGradeCreationAttributes[]> {
    const result = await this.findAll({
      where: {
        classId,
        teacherId,
      },
    });

    return result;
  }

  static async gradeTypeExists(
    classId: number,
    teacherId: number,
    gradeType: string
  ): Promise<boolean> {
    const result = await this.findOne({
      where: {
        classId,
        teacherId,
        gradeType,
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

  static async idExists(id: number, teacherId: number): Promise<boolean> {
    const result = await this.findOne({
      where: {
        id,
        teacherId,
      },
    });

    return !!result;
  }

  static async deleteGradeType(
    teacherId: number,
    gradeType: string
  ): Promise<number> {
    const result = await this.destroy({
      where: {
        teacherId,
        gradeType,
      },
    });

    return result;
  }

  static async getGradeType(teacherId: number, gradeType: string) {
    const result = await this.findAll({
      where: {
        teacherId,
        gradeType,
      },
    });

    return result;
  }

  static async classIdGrade(
    classId: number,
    teacherId: number,
    gradeType: string
  ): Promise<IGradeCreationAttributes[]> {
    const result = await this.findAll({
      where: {
        classId,
        teacherId,
        gradeType,
      },
    });

    return result;
  }
}
