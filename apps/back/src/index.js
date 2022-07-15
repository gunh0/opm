const http = require("http");
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());

const server = http.createServer(app);
const socketIO = require("socket.io");
const io = socketIO(server);
const port = 8080;

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
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
