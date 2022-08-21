import fs from "fs";

import { ConnectOptions } from "mongoose";

export const liveServerPemKey = "/etc/letsencrypt/live/proofor.cf/cert.pem";
export const liveServerPrivatePemKey =
  "/etc/letsencrypt/live/proofor.cf/privkey.pem";
export const PORT = 8080;
export const isLiveServer = fs.existsSync(liveServerPemKey);
export const mongooseOption: ConnectOptions = {
  dbName: "OPM",
};
export const DB_URL = "mongodb://root:1234@localhost:27017";
