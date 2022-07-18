const http = require("http");
const express = require("express");
const cors = require("cors");
const socketIO = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const PORT = 8080;
app.use(cors());

server.listen(PORT, (req, res) => {
  console.info(`Listening on port ${PORT}`);
});

io.on("connection", (socket) => {
  socket.on("setUser", (data) => {
    console.log(data);

    io.emit("enter", data);
  });

  socket.on("message", (data) => {
    console.log("client가 보낸 데이터: ", data);
    io.emit("upload", data);
  });

  socket.on("leaveUser", (nick) => {
    io.emit("out", nick);
  });
});
