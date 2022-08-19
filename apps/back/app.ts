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

let opmServer;
const liveServer = "/etc/letsencrypt/live/proofor.cf/cert.pem";
const PORT = 8080;
const liveServerChecker = () => {
  if (fs.existsSync(liveServer)) {
    const options = {
      key: fs.readFileSync("/etc/letsencrypt/live/proofor.cf/privkey.pem"),
      cert: fs.readFileSync("/etc/letsencrypt/live/proofor.cf/cert.pem"),
    };
    opmServer = https.createServer(options, app);
    console.info("proofor live server.");
    opmServer.listen(PORT, () => {
      console.info(`Listening on port ${PORT}`);
      const io = new Server(opmServer, { cors: { origin: "*" } });
      runSocket(io);
    });
  } else {
    opmServer = http.createServer(app);
    console.info("localhost");
    opmServer.listen(PORT, () => {
      console.info(`Listening on port ${PORT}`);
      const io = new Server(opmServer, { cors: { origin: "*" } });
      runSocket(io);
    });
  }
};
liveServerChecker();

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
