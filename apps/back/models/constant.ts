import fs from "fs";

export const liveServerPemKey = "/etc/letsencrypt/live/proofor.cf/cert.pem";
export const liveServerPrivatePemKey =
  "/etc/letsencrypt/live/proofor.cf/privkey.pem";
export const PORT = 8080;
export const isLiveServer = fs.existsSync(liveServerPemKey);
