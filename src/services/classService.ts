import { WhereOptions } from "sequelize";

import Class, { ClassCreationAttributes } from "../models/Class";

export const getClasses = async (teacher_id: number) => {
  const where: WhereOptions = {
    teacher_id,
  };

  const classes = await Class.findAll({ where });
  return classes;
};

export const getClassCount = async (teacher_id: number) => {
  const where: WhereOptions = {
    teacher_id,
  };

  const count = await Class.count({ where });
  return count;
};

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

interface CreateClass extends ClassCreationAttributes {
  class_name: string;
  teacher_id: number;
}

export const createClass = async (classData: CreateClass) => {
  const newClass = await Class.create(classData);
  return newClass;
};
