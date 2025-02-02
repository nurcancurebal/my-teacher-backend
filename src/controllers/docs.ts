import { NextFunction, Response, Request } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJSDocs from "swagger-jsdoc";

import config from "../config";

export default { generateDocs };

function generateDocs(_req: Request, res: Response, next: NextFunction) {
  try {
    const swaggerSpec = swaggerJSDocs(config.swagger(res.app));
    res.send(swaggerUi.generateHTML(swaggerSpec));
  } catch (error) {
    next(error);
  }
}
