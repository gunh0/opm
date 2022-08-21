import http from "http";
import https from "https";
import fs from "fs";

import express, { Express } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import swaggerUi from "swagger-ui-express";

import routes from "../routes";
import { specs } from "../swagger/swagger";
import {
  DB_URL,
  isLiveServer,
  liveServerPemKey,
  liveServerPrivatePemKey,
  mongooseOption,
} from "../models/constant";

const getServerOptions = () => {
  const serverOptions: any = {};
  if (isLiveServer) {
    serverOptions.key = fs.readFileSync(liveServerPrivatePemKey);
    serverOptions.cert = fs.readFileSync(liveServerPemKey);
  }
  return serverOptions;
};

const setupMiddleware = (app: Express) => {
  app.use(cors());
  app.use(bodyParser.json());
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
  app.use(routes);
};

export const getServer = () => {
  const app = express();
  setupMiddleware(app);

  const serverOptions = getServerOptions();
  const serverScheme = isLiveServer ? https : http;
  const opmServer = serverScheme.createServer(serverOptions, app);

  return opmServer;
};
