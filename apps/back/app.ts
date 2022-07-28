import dotEnv from "dotenv";
import express from "express";
import { randomUUID } from "crypto";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import mongoose, { ConnectOptions } from "mongoose";

import { specs } from "./swagger/swagger";

dotEnv.config();
const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(cors());

const PORT = 8080;
server.listen(PORT, () => {
  console.info(`Listening on port ${PORT}`);
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
app.use(require("./routes"));

interface RoomData {
  boardId: number;
}

io.on("connection", (socket) => {
  const roomData = {} as RoomData; // TODO: DB
  console.info("server received connection!", socket.id);

  socket.on("roomData", (data) => {
    roomData.boardId = data.boardId;
    socket.emit("message", {
      boardId: roomData.boardId,
      messageId: randomUUID(),
      type: "SYSTEM",
      from: "SYSTEM",
      to: socket.id,
      timestamp: new Date().toISOString(),
      textBody: "open chatting room",
    });
  });

  socket.on("message", (data) => {
    socket.emit("message", { ...data, messageId: randomUUID() });
  });

  socket.on("disconnect", (socket) => {
    console.info("disconnect", socket);
  });
});

const mongooseOption: ConnectOptions = {
  dbName: "OPM",
};

mongoose
  .connect(process.env.DB_URL, mongooseOption)
  .then(() => console.log("MongoDB connected successfully."))
  .catch((err) => {
    console.log(err);
  });
