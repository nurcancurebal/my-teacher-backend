import dotenv from "dotenv";
dotenv.config();

import app from "./app";

const HOSTNAME = app.get("hostname");
const PORT = app.get("port");
const ENV_MODE = app.get("env");

app.listen(PORT, HOSTNAME, () => {
  console.log(
    `Api is running at http://${HOSTNAME}:${PORT} in ${ENV_MODE} mode.`
  );
});
