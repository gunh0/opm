import { randomUUID } from "crypto";

import { SocketPath } from "opm-models";
import { Server } from "socket.io";

// interface RoomData {
//   aId: string;
// }
type Rooms = Record<string, string[]>;

export const runSocket = (io: Server) => {
  io.on(SocketPath.CONNECT, (socket) => {
    const rooms = {
      // 'a31b3fed-72d8-4b15-bfa5-ff73abcae70d': []
    } as Rooms;
    console.info("server received connection!", socket.id);

    socket.on(SocketPath.ROOM_DATA, (data) => {
      const { aId } = data;
      // TODO: rooms에 aId가 키 값으로 있고, 그 배열 안에 소켓 아이디가 있어야 함.
      if (!rooms[aId]) {
        rooms[aId] = [];
      }
      socket.emit(SocketPath.MESSAGE, {
        aId,
        messageId: randomUUID(),
        type: "SYSTEM",
        from: "SYSTEM",
        to: socket.id,
        timestamp: new Date().toISOString(),
        textBody: "open chatting room",
      });
      rooms[aId].push(socket.id);
      socket.join(aId);
    });

    socket.on(SocketPath.MESSAGE, (data) => {
      // TODO: aId를 기준으로 거기에다가 메시지 보내야 함.
      // console.info("received", data);
      // console.log(rooms);
      socket.emit("message", { ...data, messageId: randomUUID() });
      // socket.to(roomData.aId).emit(SocketPath.MESSAGE, { textBody: "WOW~!!" });
    });

    socket.on("disconnect", () => {
      console.info("disconnect", socket.id);
    });
  });
};
