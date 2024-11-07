import { Router } from "express";

import authRouter from "./authRoute";
import docsRouter from "./docsRoute";
import userRouter from "./userRoute";
import globalRouter from "./globalRoute";
import classRouter from "./classRoute";
import studentRouter from "./studentRoute";
import gradeRouter from "./gradeRoute";

const appRouter = Router();

// all routes
const appRoutes = [
  {
    path: "/auth",
    router: authRouter,
  },
  {
    path: "/user",
    router: userRouter,
  },
  {
    path: "/docs",
    router: docsRouter,
  },
  {
    path: "/",
    router: globalRouter,
  },
  {
    path: "/class",
    router: classRouter,
  },
  {
    path: "/student",
    router: studentRouter,
  },
  {
    path: "/grade",
    router: gradeRouter,
  },
];

appRoutes.forEach(route => {
  appRouter.use(route.path, route.router);
});

export default appRouter;
