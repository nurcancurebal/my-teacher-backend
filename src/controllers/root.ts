import { NextFunction, Response, Request } from "express";

import helperUptimeClockFormat from "../helpers/uptime-clock-format";

import sequelize, { dbSync } from "../utils/db";

const SERVER_UP_TIME = new Date();

import {
  version as SERVER_VERSION,
  name as SERVER_NAME,
  description as SERVER_DESCRIPTION,
} from "../../package.json";

export default { home, databaseSync };

async function home(_req: Request, res: Response, next: NextFunction) {
  try {
    const currentUptimeClockFormat = helperUptimeClockFormat(
      new Date().getTime() - SERVER_UP_TIME.getTime()
    );

    const dbStatus = sequelize?.authenticate() ? "connected" : "disconnected";

    res.json({
      error: false,
      data: {
        uptime: SERVER_UP_TIME,
        version: SERVER_VERSION,
        name: SERVER_NAME,
        description: SERVER_DESCRIPTION,
        currentUptimeClockFormat,
        dbStatus,
      },
      message: res.locals.getLang("API_STATUS_MESSAGE"),
    });
  } catch (error) {
    next(error);
  }
}

async function databaseSync(_req: Request, res: Response, next: NextFunction) {
  try {
    const result = await dbSync();
    res.json({
      error: false,
      data: result,
      message: res.locals.getLang("DATABASE_SYNC_SUCCESS"),
    });
  } catch (error) {
    next(error);
  }
}
