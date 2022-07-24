const express = require("express");
const app = express();

const http = require("http");
const server = http.createServer(app);

const socketIO = require("socket.io");
const io = socketIO(server);

const cors = require("cors");
app.use(cors());

const PORT = 8080;
server.listen(PORT, (req, res) => {
  console.info(`Listening on port ${PORT}`);
});

const { swaggerUi, specs } = require("../swagger/swagger");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use(require("./routes"));

io.on("connection", (socket) => {
  console.info("server received connection!", socket.id);

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

  socket.on("disconnect", (socket) => {
    console.info("disconnect", socket);
  });
});
