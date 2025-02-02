import express from "express";
import logger from "morgan";
import cors from "cors";

const { HOSTNAME, PORT, NODE_ENV } = process.env;

const app = express();

app.set("hostname", HOSTNAME || "localhost");
app.set("port", PORT || 3000);
app.set("env", NODE_ENV || "production");

app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

import router from "./routes";

app.use("/api", router);

app.use((_req, res) => res.send());

import "./utils/db-associations";

export default app;
