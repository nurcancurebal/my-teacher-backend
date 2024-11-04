import { WhereOptions } from "sequelize";

import Class, { ClassCreationAttributes } from "../models/Class";

interface ClassExistsOptions {
  class_id: number;
  teacher_id: number;
}

export const classExists = async (options: ClassExistsOptions) => {
  if (!options.class_id || !options.teacher_id) {
    throw new Error("Please provide both class_id and teacher_id");
  }

  const where: WhereOptions = {
    id: options.class_id,
    teacher_id: options.teacher_id,
  };

  const classInstance = await Class.findOne({ where });
  return classInstance !== null;
};

/**
 * Yeni bir sınıf oluşturur.
 * @param classData - Oluşturulacak sınıfın verileri.
 * @returns Oluşturulan sınıfın verilerini içeren bir nesne.
 */

interface CreateClass extends ClassCreationAttributes {
  class_name: string;
  teacher_id: number;
}

export const createClass = async (classData: CreateClass) => {
  const newClass = await Class.create(classData);
  return newClass;
};
