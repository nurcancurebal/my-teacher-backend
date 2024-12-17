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
  teacher_id: number;
  class_name: string;
  explanation: string;
}

export const createClass = async (classData: CreateClass) => {
  const newClass = await Class.create(classData);
  return newClass;
};

export const teacherIsClass = async (teacher_id: number, id: number) => {
  const where: WhereOptions = {
    teacher_id,
    id,
  };

  const classInstance = await Class.findOne({ where });
  return classInstance !== null;
};

interface UpdateClass {
  id: number;
  class_name?: string;
  explanation?: string;
}

export const updateClass = async (classData: UpdateClass) => {
  const { id, ...updateFields } = classData;

  const where: WhereOptions = {
    id,
  };

  const [updated] = await Class.update(updateFields, { where });

  return updated;
};

export const deleteClass = async (id: number) => {
  const where: WhereOptions = {
    id,
  };

  const deleted = await Class.destroy({ where });

  return deleted;
};
