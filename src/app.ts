import express from "express";
import logger from "morgan";
import cors from "cors";
import { deserializeUser } from "./middleware";
import appRouter from "./routes";
import { errorHandler } from "./middleware/error";

import User from "./models/User";
import Class from "./models/Class";
import Student from "./models/Student";

// Create Express server
const app = express();

// Adding Middleware
app.use(logger("dev")); // HTTP isteklerini "dev" formatında loglar.

app.set("port", process.env.PORT || 3000);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use(deserializeUser);

User.hasMany(Class, { foreignKey: "teacher_id" });
Class.belongsTo(User, { foreignKey: "teacher_id" });
Class.hasMany(Student, { foreignKey: "class_id" });
Student.belongsTo(Class, { foreignKey: "class_id" });

// Primary app routes.
app.use("/api", appRouter);

// middleware to handle error
app.use(errorHandler);
export default app;
