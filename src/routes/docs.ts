import { Router } from "express";
import swaggerUi from "swagger-ui-express";

import ControllerDocs from "../controllers/docs";

const router = Router();

router.use("/", swaggerUi.serve);
router.get("/", ControllerDocs.generateDocs);

export default router;
