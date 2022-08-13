import { randomUUID } from "crypto";

import { Server } from "socket.io";

interface RoomData {
  boardId: number;
}

export const runSocket = (io: Server) => {
  io.on("connection", (socket) => {
    const roomData = {} as RoomData;
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
      console.info("received", data);
      socket.emit("message", { ...data, messageId: randomUUID() });
    });

    socket.on("disconnect", () => {
      console.info("disconnect", socket.id);
    });
  });
};
