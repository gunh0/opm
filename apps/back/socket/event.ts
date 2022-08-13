import { randomUUID } from "crypto";

import { SocketPath, MessageSocket } from "opm-models";
import { Server } from "socket.io";

type Rooms = Record<string, string[]>;

export const runSocket = (io: Server) => {
  const rooms = {} as Rooms;

  io.on(SocketPath.CONNECT, (socket) => {
    console.info("server received connection!", socket.id);

    socket.on(SocketPath.ROOM_DATA, (data) => {
      const { aId, uId } = data;
      if (!rooms[aId]) {
        rooms[aId] = [];
      }
      if (rooms[aId].length >= 2) {
        socket.emit(SocketPath.INVALID, {
          message: "Room 인원 초과",
        });
      }
      socket.emit(SocketPath.MESSAGE, {
        aId,
        messageId: randomUUID(),
        type: "SYSTEM",
        from: "SYSTEM",
        to: [uId],
        timestamp: new Date().toISOString(),
        textBody: "open chatting room",
      });
      rooms[aId].push(socket.id);
      socket.join(aId);
    });

    socket.on(SocketPath.MESSAGE, (data: MessageSocket) => {
      socket.emit(SocketPath.MESSAGE, { ...data, messageId: randomUUID() });

      const { boardId, textBody } = data;
      rooms[boardId].forEach((socketId) => {
        if (socketId === socket.id) {
          return;
        }

        socket.to(socketId).emit(SocketPath.MESSAGE, { textBody: textBody });
      });
    });

    socket.on(SocketPath.DISCONNECT, () => {
      console.info("disconnect", socket.id);
    });
  });
};
