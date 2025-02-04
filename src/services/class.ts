import ModelClass, { IClassCreationAttributes } from "../models/class";

export default class ClassService extends ModelClass {
  static async findAllWithTeacherId(
    teacher_id: number
  ): Promise<IClassCreationAttributes[] | []> {
    const result = await this.findAll({
      where: {
        teacher_id,
      },
    });

    return result;
  }

  static async getCount(teacher_id: number): Promise<number> {
    const result = await this.count({
      where: {
        teacher_id,
      },
    });

    return result;
  }

  static async classNameWithExists(
    class_name: string,
    teacher_id: number
  ): Promise<boolean> {
    const classInstance = await this.findOne({
      where: { class_name, teacher_id },
    });
    return !!classInstance;
  }

  static async createOne({
    newClassName,
    teacherId,
    explanation,
  }: {
    newClassName: string;
    teacherId: number;
    explanation: string;
  }) {
    const newClass = await this.create({
      class_name: newClassName,
      teacher_id: teacherId,
      explanation,
    });
    return newClass;
  }

  static async teacherIsClass(teacher_id: number, id: number) {
    const result = await this.findOne({ where: { teacher_id, id } });
    return !!result;
  }

  static async updateOne(
    id: number,
    { className, explanation }: { className?: string; explanation?: string }
  ) {
    const result = await this.update(
      { class_name: className, explanation },
      { where: { id } }
    );
    return result;
  }

  static async deleteOne(id: number) {
    const result = await this.destroy({ where: { id } });
    return result;
  }

  static async existsById(id: number, teacher_id: number): Promise<boolean> {
    const result = await this.findOne({ where: { id, teacher_id } });
    return !!result;
  }
}
