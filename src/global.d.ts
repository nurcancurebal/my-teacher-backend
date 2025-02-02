import { Response } from "express-serve-static-core";

declare global {
  namespace Express {
    interface Response {
      locals: any;
    }
  }
}

export {};
