const http = require("http");
const express = require("express");
const cors = require("cors");
const socketIO = require("socket.io");
const { randomUUID } = require("crypto");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const PORT = 8080;
app.use(cors());

server.listen(PORT, (req, res) => {
  console.info(`Listening on port ${PORT}`);
});

io.on("connection", (socket) => {
  const roomData = {}; // TODO: DB
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
