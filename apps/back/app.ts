import http from "http";
import https from "https";
import fs from "fs";

import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import dotEnv from "dotenv";
import swaggerUi from "swagger-ui-express";
import mongoose, { ConnectOptions } from "mongoose";
import { Server } from "socket.io";

import routes from "./routes";
import { specs } from "./swagger/swagger";
import { runSocket } from "./socket/event";

dotEnv.config();
const app = express();

const liveServer = "/etc/letsencrypt/live/proofor.cf/cert.pem";
const isLiveServer = fs.existsSync(liveServer);
const PORT = 8080;

const serverOptions: any = {};
if (isLiveServer) {
  serverOptions.key = fs.readFileSync(
    "/etc/letsencrypt/live/proofor.cf/privkey.pem",
  );
  serverOptions.cert = fs.readFileSync(
    "/etc/letsencrypt/live/proofor.cf/cert.pem",
  );
}

const opmServer = https.createServer(serverOptions, app);
opmServer.listen(PORT, () => {
  console.info(
    `${
      isLiveServer ? "LIVE" : "LOCAL"
    } Server is running... Listening on port ${PORT}`,
  );
  const io = new Server(opmServer, { cors: { origin: "*" } });
  runSocket(io);
});

app.use(cors());
app.use(bodyParser.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
app.use(routes);

const mongooseOption: ConnectOptions = {
  dbName: "OPM",
};

mongoose
  .connect(process.env.DB_URL, mongooseOption)
  .then(() => console.info("MongoDB connected successfully."))
  .catch((err) => {
    console.info("MongoDB Connection Failed");
    console.info(err);
  });

export default opmServer;
