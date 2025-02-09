import ModelClass, { IClassCreationAttributes } from "../models/class";

export default class ClassService extends ModelClass {
  static async findAllWithTeacherId(
    teacherId: number
  ): Promise<IClassCreationAttributes[]> {
    const result = await this.findAll({
      where: {
        teacherId,
      },
    });

    return result;
  }

  static async getCount(teacherId: number): Promise<number> {
    const result = await this.count({
      where: {
        teacherId,
      },
    });

    return result;
  }

  static async classNameWithExists(
    className: string,
    teacherId: number
  ): Promise<boolean> {
    const classInstance = await this.findOne({
      where: { className, teacherId },
    });
    return !!classInstance;
  }

  static async createOne(
    data: IClassCreationAttributes
  ): Promise<IClassCreationAttributes> {
    const result = await this.create(data);

    return result;
  }

  static async updateOne(
    id: number,
    data: IClassCreationAttributes
  ): Promise<number[]> {
    const result = await this.update(data, { where: { id } });
    return result;
  }

  static async verifyClassAssignment(
    teacherId: number,
    id: number
  ): Promise<IClassCreationAttributes> {
    const result = await this.findOne({ where: { teacherId, id } });
    return result;
  }

  static async deleteOne(id: number): Promise<number> {
    const result = await this.destroy({ where: { id } });
    return result;
  }

  static async idWithExists(id: number, teacherId: number): Promise<boolean> {
    const result = await this.findOne({ where: { id, teacherId } });
    return !!result;
  }
}
