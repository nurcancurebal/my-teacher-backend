import bcrypt from "bcrypt";

import config from "../config";

export default { encryptAsync, encryptSync, compareAsync, compareSync };

async function encryptAsync(password: string) {
  return await bcrypt.hash(password, config.jwt.saltRound);
}

function encryptSync(password: string) {
  return bcrypt.hashSync(password, config.jwt.saltRound);
}

function compareSync(password: string, hash: string) {
  return bcrypt.compareSync(password, hash);
}

async function compareAsync(password: string, hash: string) {
  return await bcrypt.compare(password, hash);
}
