import { WhereOptions } from "sequelize";

import Class, { ClassCreationAttributes } from "../models/Class";

interface ClassExistsOptions {
  class_name: string;
}

export const classExists = async (options: ClassExistsOptions) => {
  if (!options.class_name) {
    throw new Error("class_name is required");
  }

  const where: WhereOptions = {
    class_name: options.class_name,
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
