import { Router } from "express";

const router = Router();

import MiddlewareAuth from "../middlewares/auth";
import MiddlewareLang from "../middlewares/lang";

router.use(MiddlewareLang);
router.use(MiddlewareAuth);
router.use(MiddlewareLang);

import RouterProfile from "./profile";
import RouterAuth from "./auth";
import RouterClass from "./class";
import RouterStudent from "./student";
import RouterGrade from "./grade";
import RouterDocs from "./docs";
import RouterRoot from "./root";

router.use("/auth", RouterAuth);
router.use("/profile", RouterProfile);
router.use("/class", RouterClass);
router.use("/student", RouterStudent);
router.use("/grade", RouterGrade);
router.use("/docs", RouterDocs);
router.use("/", RouterRoot);

import MiddlewareError from "../middlewares/error";
import MiddlewareNotFound from "../middlewares/not-found";

router.use(MiddlewareNotFound);
router.use(MiddlewareError);

export default router;
