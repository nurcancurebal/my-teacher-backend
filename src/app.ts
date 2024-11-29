import express from "express";
import logger from "morgan";
import cors from "cors";
import { deserializeUser } from "./middleware";
import appRouter from "./routes";
import { errorHandler } from "./middleware/error";

import User from "./models/User";
import Class from "./models/Class";
import Student from "./models/Student";
import Grade from "./models/Grade";
import TeacherNote from "./models/TeacherNote";

// Create Express server
const app = express();

// Adding Middleware
app.use(logger("dev")); // HTTP isteklerini "dev" formatında loglar.

app.use(cors());

app.set("port", process.env.PORT || 3000);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(deserializeUser);

User.hasMany(Class, { foreignKey: "teacher_id" });
// Bir User birden fazla Class oluşturabilir. Bu ilişki, Class tablosunda teacher_id adlı bir yabancı anahtar (foreign key) sütunu oluşturur
Class.belongsTo(User, { foreignKey: "teacher_id" });
//  Her Class bir User ile ilişkilidir. Bu ilişki, Class tablosundaki teacher_id sütununun User tablosundaki id sütununa referans verdiğini belirtir.

Class.hasMany(Student, { foreignKey: "class_id" });
Student.belongsTo(Class, { foreignKey: "class_id" });

User.hasMany(Student, { foreignKey: "teacher_id" });
Student.belongsTo(User, { foreignKey: "teacher_id" });

Student.hasMany(Grade, { foreignKey: "student_id" });
Grade.belongsTo(Student, { foreignKey: "student_id" });

Class.hasMany(Grade, { foreignKey: "class_id" });
Grade.belongsTo(Class, { foreignKey: "class_id" });

Student.hasMany(TeacherNote, { foreignKey: "student_id" });
TeacherNote.belongsTo(Student, { foreignKey: "student_id" });

User.hasMany(TeacherNote, { foreignKey: "teacher_id" });
TeacherNote.belongsTo(User, { foreignKey: "teacher_id" });

// Primary app routes.
app.use("/api", appRouter);

// middleware to handle error
app.use(errorHandler);
export default app;
