import { Sequelize } from "sequelize";

import config from "../config";

const isDevelopmentMode = process.env.NODE_ENV === "development";

const sequelize = new Sequelize(
  config.db.database,
  config.db.username,
  config.db.password,
  {
    host: config.db.host,
    port: config.db.port,
    dialect: config.db.dialect,
    logging: () => () => {},
  }
);

dbSync()
  .then(response => {
    console.log("DB sync with status:", response?.success);
  })
  .catch(error => {
    console.error("Failed to sync database:", error);
  });

export { dbSync };

export default sequelize;

async function dbSync() {
  try {
    await sequelize.sync({ alter: isDevelopmentMode });
    return { success: true };
  } catch (error) {
    console.error(error);
  }
}
