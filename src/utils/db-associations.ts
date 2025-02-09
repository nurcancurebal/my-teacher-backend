import ModelUser from "../models/user";
import ModelClass from "../models/class";
import ModelStudent from "../models/student";
import ModelGrade from "../models/grade";

ModelUser.hasMany(ModelClass, { foreignKey: "teacherId" });
ModelClass.belongsTo(ModelUser, { foreignKey: "teacherId" });

ModelClass.hasMany(ModelStudent, { foreignKey: "classId" });
ModelStudent.belongsTo(ModelClass, { foreignKey: "classId" });

ModelUser.hasMany(ModelStudent, { foreignKey: "teacherId" });
ModelStudent.belongsTo(ModelUser, { foreignKey: "teacherId" });

ModelUser.hasMany(ModelGrade, { foreignKey: "teacherId" });
ModelGrade.belongsTo(ModelUser, { foreignKey: "teacherId" });

ModelStudent.hasMany(ModelGrade, { foreignKey: "studentId" });
ModelGrade.belongsTo(ModelStudent, { foreignKey: "studentId" });

ModelClass.hasMany(ModelGrade, { foreignKey: "classId" });
ModelGrade.belongsTo(ModelClass, { foreignKey: "classId" });
