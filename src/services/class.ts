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

  static async exists(class_name: string): Promise<boolean> {
    const classInstance = await this.findOne({ where: { class_name } });
    return !!classInstance;
  }

  static async createOne(classData: IClassCreationAttributes) {
    const newClass = await this.create(classData);
    return newClass;
  }

  static async teacherIsClass(teacher_id: number, id: number) {
    const result = await this.findOne({ where: { teacher_id, id } });
    return !!result;
  }

  static async updateOne(
    id: number,
    data: { class_name: string; explanation: string }
  ) {
    const result = await this.update(data, { where: { id } });
    return result;
  }

  static async deleteOne(id: number) {
    const result = await this.destroy({ where: { id } });
    return result;
  }
}
