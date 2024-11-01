import { Sequelize } from "sequelize";
import { dbConfig } from "../config/config";
import logger from "../util/logger";

const isDev = process.env.NODE_ENV === "development";

const sequelizeConnection = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
    logging: msg => logger.debug(msg),
  }
);

const dbSync = async () => {
  try {
    await sequelizeConnection.sync({ alter: isDev });
    //alter: isDev parametresi, geliştirme ortamında tabloları otomatik olarak günceller.
    return { success: true };
  } catch (error) {
    logger.error("Failed to sync DB", error);
    throw { success: false, error: error.message };
  }
};
dbSync()
  .then(res => {
    logger.info(`DB sync with status: ${res.success}`);
  })
  .catch(err => {
    logger.error("Failed to sync DB", err);
  });

export { dbSync };

export default sequelizeConnection;
