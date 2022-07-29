import { randomUUID } from "crypto";
import http from "http";

import cors from "cors";
import express from "express";
import dotEnv from "dotenv";
import { Server } from "socket.io";
import swaggerUi from "swagger-ui-express";
import mongoose, { ConnectOptions } from "mongoose";

import routes from "./routes";
import { specs } from "./swagger/swagger";

dotEnv.config();
const app = express();
const server = http.createServer(app);
const PORT = 8080;
const io = new Server(server, { cors: { origin: "*" } });

app.use(cors());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
app.use(routes);

server.listen(PORT, () => {
  console.info(`Listening on port ${PORT}`);
});

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
