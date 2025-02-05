import ModelUser from "../models/user";
import ModelClass from "../models/class";
import ModelStudent from "../models/student";
import ModelGrade from "../models/grade";

ModelUser.hasMany(ModelClass, { foreignKey: "teacher_id" });
ModelClass.belongsTo(ModelUser, { foreignKey: "teacher_id" });

ModelClass.hasMany(ModelStudent, { foreignKey: "class_id" });
ModelStudent.belongsTo(ModelClass, { foreignKey: "class_id" });

ModelUser.hasMany(ModelStudent, { foreignKey: "teacher_id" });
ModelStudent.belongsTo(ModelUser, { foreignKey: "teacher_id" });

ModelUser.hasMany(ModelGrade, { foreignKey: "teacher_id" });
ModelGrade.belongsTo(ModelUser, { foreignKey: "teacher_id" });

ModelStudent.hasMany(ModelGrade, { foreignKey: "student_id" });
ModelGrade.belongsTo(ModelStudent, { foreignKey: "student_id" });

ModelClass.hasMany(ModelGrade, { foreignKey: "class_id" });
ModelGrade.belongsTo(ModelClass, { foreignKey: "class_id" });
