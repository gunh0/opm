import http from "http";

import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import dotEnv from "dotenv";
import swaggerUi from "swagger-ui-express";
import mongoose, { ConnectOptions } from "mongoose";

import routes from "./routes";
import { specs } from "./swagger/swagger";

dotEnv.config();
const app = express();
const opmServer = http.createServer(app);
const PORT = 8080;

app.use(cors());
app.use(bodyParser.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
app.use(routes);

opmServer.listen(PORT, () => {
  console.info(`Listening on port ${PORT}`);
});

const mongooseOption: ConnectOptions = {
  dbName: "OPM",
};

mongoose
  .connect(process.env.DB_URL, mongooseOption)
  .then(() => console.log("MongoDB connected successfully."))
  .catch((err) => {
    console.log("MongoDB Connection Failed");
    console.log(err);
  });

export default opmServer;
